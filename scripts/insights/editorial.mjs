import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

export const origin = 'https://www.thewidercollective.com';
export const hashArticle = (article) => {
  const { status, ...content } = article;
  return crypto.createHash('sha256').update(JSON.stringify(content)).digest('hex');
};
export const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(`${file}.tmp`, `${JSON.stringify(data, null, 2)}\n`);
  fs.renameSync(`${file}.tmp`, file);
}
export function load(root = process.cwd()) {
  const queuePath = path.join(root, 'editorial/queue.json');
  const directory = path.join(root, 'src/content/insights');
  const articles = new Map(fs.readdirSync(directory).filter(f => f.endsWith('.json'))
    .map(f => { const a = readJson(path.join(directory, f)); return [a.slug, a]; }));
  return { root, queuePath, directory, queue: readJson(queuePath), articles };
}
export function validate(state) {
  assert.equal(state.queue.version, 1);
  const ids = new Set(); const keywords = new Set();
  for (const item of state.queue.items) {
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert(!ids.has(item.slug), `Duplicate queue slug: ${item.slug}`); ids.add(item.slug);
    assert(typeof item.primaryKeyword === 'string' && item.primaryKeyword.trim());
    const keyword = item.primaryKeyword.toLowerCase().trim();
    assert(!keywords.has(keyword), `Duplicate primary intent: ${keyword}`); keywords.add(keyword);
    assert(['backlog', 'draft', 'in_review', 'approved', 'released', 'published'].includes(item.state));
    if (item.state === 'backlog') { assert(!state.articles.has(item.slug), `${item.slug}: backlog has a content file`); continue; }
    const article = state.articles.get(item.slug);
    assert(article, `${item.slug}: content missing`);
    if (['approved', 'released', 'published'].includes(item.state)) {
      const approval = item.approval;
      assert(approval?.approvedBy && approval?.evidence && Number.isFinite(Date.parse(approval?.approvedAt)), `${item.slug}: missing approval evidence`);
      assert.equal(approval.contentHash, hashArticle(article), `${item.slug}: content changed after approval`);
      assert.equal(approval.scheduledAt, article.publishedAt, `${item.slug}: schedule changed after approval`);
      assert.equal(item.scheduledAt, approval.scheduledAt);
    }
    if (['released', 'published'].includes(item.state)) assert.equal(article.status, 'published');
    else assert.equal(article.status, 'draft', `${item.slug}: unapproved content is public`);
    if (item.state === 'published') {
      assert.equal(item.liveVerification?.contentHash, hashArticle(article));
      assert.equal(item.liveVerification?.url, `${origin}/insights/${item.slug}/`);
      assert(Number.isFinite(Date.parse(item.liveVerification?.checkedAt)));
    }
  }
  for (const slug of state.articles.keys()) assert(ids.has(slug), `${slug}: content missing from editorial queue`);
  return state;
}
export function releaseDue(state, now = new Date()) {
  validate(state);
  const due = state.queue.items.filter(i => i.state === 'approved' && Date.parse(i.scheduledAt) <= now.getTime());
  for (const item of due) assert(now.getTime() - Date.parse(item.scheduledAt) <= 24 * 60 * 60 * 1000, `${item.slug}: approved slot expired; obtain a new approved date`);
  const dhakaWeekStart = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  dhakaWeekStart.setUTCDate(dhakaWeekStart.getUTCDate() - (dhakaWeekStart.getUTCDay() + 6) % 7);
  dhakaWeekStart.setUTCHours(0, 0, 0, 0);
  const weekStart = dhakaWeekStart.getTime() - 6 * 60 * 60 * 1000;
  const releasedThisWeek = state.queue.items.filter(i => ['released', 'published'].includes(i.state) && Date.parse(i.releasedAt || i.scheduledAt) >= weekStart).length;
  if (due.length) assert(releasedThisWeek + due.length <= (state.queue.cadence?.weeklyArticleLimit ?? 2), 'Weekly article limit exceeded; revise the approved schedule');
  for (const item of due) {
    state.articles.get(item.slug).status = 'published';
    item.state = 'released';
    item.releasedAt = now.toISOString();
  }
  validate(state);
  return due.map(i => i.slug);
}
export function save(state, slugs = []) {
  for (const slug of slugs) writeJson(path.join(state.directory, `${slug}.json`), state.articles.get(slug));
  writeJson(state.queuePath, state.queue);
}
export async function verifyLive(state, fetcher = fetch) {
  validate(state);
  async function get(pathname, expected = 200) {
    const response = await fetcher(`${origin}${pathname}`, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
    assert.equal(response.status, expected, `${pathname}: HTTP ${response.status}, expected ${expected}`);
    if (expected === 200) assert.equal(response.url, `${origin}${pathname}`, `${pathname}: unexpected redirect`);
    return response.text();
  }
  const home = await get('/');
  assert(home.includes('href="/insights/"'), 'Homepage Insights link missing');
  const index = await get('/insights/');
  const sitemap = await get('/sitemap.xml');
  const robots = await get('/robots.txt');
  assert(robots.includes(`${origin}/sitemap.xml`), 'Robots sitemap reference missing');
  await get('/insights/nonexistent-verification-route/', 404);
  const verified = [];
  for (const item of state.queue.items) {
    const article = state.articles.get(item.slug);
    if (!article) continue;
    const url = `${origin}/insights/${item.slug}/`;
    if (article.status === 'published' && Date.parse(article.publishedAt) <= Date.now()) {
      const html = await get(`/insights/${item.slug}/`);
      assert(index.includes(`/insights/${item.slug}/`), `${item.slug}: absent from index`);
      assert(sitemap.includes(url), `${item.slug}: absent from sitemap`);
      assert(html.includes(`name="twc-insight-revision" content="${hashArticle(article)}"`), `${item.slug}: live version differs`);
      assert(html.includes(`rel="canonical" href="${url}"`), `${item.slug}: canonical mismatch`);
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${item.slug}: expected one H1`);
      verified.push({ slug: item.slug, url, contentHash: hashArticle(article), checkedAt: new Date().toISOString() });
    } else {
      assert(!index.includes(`/insights/${item.slug}/`), `${item.slug}: draft visible in index`);
      assert(!sitemap.includes(url), `${item.slug}: draft visible in sitemap`);
      await get(`/insights/${item.slug}/`, 404);
    }
  }
  return verified;
}
