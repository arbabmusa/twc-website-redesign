import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load, validate, releaseDue, save, hashArticle, verifyLive } from './insights/editorial.mjs';

const [command = 'status', slug, ...args] = process.argv.slice(2);
const option = name => { const index = args.indexOf(`--${name}`); return index < 0 ? undefined : args[index + 1]; };
const state = validate(load());
const item = state.queue.items.find(i => i.slug === slug);
const article = state.articles.get(slug);
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
if (command === 'status') {
  console.table(state.queue.items.map(i => ({ slug: i.slug, state: i.state, scheduled: i.scheduledAt || '—', demand: i.demand?.monthlySearches ?? 'unmeasured' })));
} else if (command === 'validate') {
  console.log(`Editorial checks passed: ${state.queue.items.length} topics, ${state.articles.size} articles.`);
} else if (command === 'review') {
  assert(item && article, 'Choose an existing article');
  assert(['draft', 'in_review'].includes(item.state), 'Only unpublished drafts can enter review');
  assert(fs.existsSync(path.join('editorial/briefs', `${slug}.json`)), 'Save the research brief before requesting approval');
  const at = option('at');
  assert(at && Number.isFinite(Date.parse(at)) && Date.parse(at) > Date.now(), 'Provide a future --at ISO publication date');
  article.publishedAt = new Date(at).toISOString(); article.updatedAt = article.publishedAt;
  item.state = 'in_review'; item.scheduledAt = article.publishedAt; item.reviewHash = hashArticle(article);
  delete item.approval;
  save(state, [slug]);
  console.log(`Review prepared: ${slug}\nPublication: ${item.scheduledAt}\nVersion: ${item.reviewHash}`);
} else if (command === 'approve') {
  assert(item && article && item.state === 'in_review', 'Prepare the article for review first');
  assert.equal(option('hash'), hashArticle(article), 'Approval must name the exact reviewed hash');
  assert.equal(item.reviewHash, hashArticle(article), 'Content changed since review');
  assert(option('by') && option('evidence'), 'Record the actual approver and user-message/review reference');
  assert(Date.parse(item.scheduledAt) > Date.now(), 'Publication date expired; prepare a new review');
  item.approval = { contentHash: hashArticle(article), scheduledAt: item.scheduledAt, approvedBy: option('by'), evidence: option('evidence'), approvedAt: new Date().toISOString() };
  item.state = 'approved'; validate(state); save(state);
  console.log(`Approved exact version of ${slug} for ${item.scheduledAt}`);
} else if (command === 'release') {
  const released = releaseDue(state);
  if (released.length) save(state, released);
  console.log(JSON.stringify({ released, message: released.length ? 'Release prepared; build, deploy, and verify before claiming publication.' : 'No approved articles due.' }));
} else if (command === 'verify-live') {
  const verified = await verifyLive(state);
  if (process.argv.includes('--record')) {
    for (const record of verified) { const entry = state.queue.items.find(i => i.slug === record.slug); entry.state = 'published'; entry.liveVerification = record; }
    validate(state); save(state);
  }
  console.log(JSON.stringify({ verified }, null, 2));
} else if (command === 'preview') {
  const directory = path.resolve('.insights-review'); fs.mkdirSync(directory, { recursive: true });
  const cards = [];
  for (const entry of state.queue.items.filter(i => ['draft', 'in_review'].includes(i.state))) {
    const a = state.articles.get(entry.slug);
    const body = `<p class="eyebrow">TWC INSIGHTS · PRIVATE EDITORIAL REVIEW</p><h1>${escape(a.title)}</h1><p class="deck">${escape(a.description)}</p><p>State: ${escape(entry.state)} · Proposed date: ${escape(entry.scheduledAt || 'Not scheduled')}</p><p>Version: <code>${hashArticle(a)}</code></p><blockquote>${escape(a.takeaway)}</blockquote>${a.sections.map(s => `<h2>${escape(s.heading)}</h2>${s.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}${s.bullets ? `<ul>${s.bullets.map(b => `<li>${escape(b)}</li>`).join('')}</ul>` : ''}`).join('')}<h2>Sources</h2><ul>${a.sources.map(s => `<li><a href="${escape(s.url)}">${escape(s.title)}</a></li>`).join('')}</ul><h2>Article call to action</h2><p>${escape(a.cta.label)}</p><hr><p>Approval covers this full article, metadata, sources, CTA, version, and proposed date. Changes require a fresh review.</p>`;
    fs.writeFileSync(path.join(directory, `${entry.slug}.html`), page(a.title, body));
    cards.push(`<li><a href="${entry.slug}.html">${escape(a.title)}</a> — ${escape(entry.state)}</li>`);
  }
  fs.writeFileSync(path.join(directory, 'index.html'), page('TWC Insights review', `<p class="eyebrow">TWC / EDITORIAL</p><h1>Ready for your review.</h1><p>These drafts are excluded from the public website. Open each article to read the full version and proposed publication date.</p><ul>${cards.join('')}</ul>`));
  console.log(path.join(directory, 'index.html'));
} else throw new Error(`Unknown command: ${command}`);

function page(title, body) { return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(title)}</title><style>body{margin:0;background:#101114;color:#eceef1;font:17px/1.75 system-ui,sans-serif}main{max-width:800px;margin:auto;padding:56px 24px}h1{font-size:clamp(32px,6vw,56px);line-height:1.1;letter-spacing:-.04em}h2{margin-top:40px;line-height:1.3}a,.eyebrow{color:#86e9ff}blockquote{margin:32px 0;padding:24px;border-left:3px solid #86e9ff;background:#1b2329}.deck{font-size:22px;color:#bec3cd}code{overflow-wrap:anywhere;font-size:12px}li{margin:10px 0}hr{border:0;border-top:1px solid #42454b;margin:40px 0}</style></head><body><main>${body}</main></body></html>`; }
