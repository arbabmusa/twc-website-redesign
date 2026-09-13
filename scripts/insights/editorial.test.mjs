import test from 'node:test';
import assert from 'node:assert/strict';
import { hashArticle, validate, releaseDue, verifyLive, origin } from './editorial.mjs';

function fixture() {
  const a = { slug: 'example-guide', title: 'Useful guide', status: 'draft', publishedAt: '2026-09-15T03:17:00.000Z', updatedAt: '2026-09-15T03:17:00.000Z', sections: [{ heading: 'Original advice', paragraphs: ['A useful answer.'] }] };
  return { queue: { version: 1, items: [{ slug: a.slug, primaryKeyword: 'example guide', state: 'approved', scheduledAt: a.publishedAt, approval: { contentHash: hashArticle(a), scheduledAt: a.publishedAt, approvedBy: 'Named editor', evidence: 'Explicit review message', approvedAt: '2026-09-14T10:00:00Z' } }] }, articles: new Map([[a.slug, a]]) };
}
test('release occurs only after the approved slot; repeat runs do not duplicate it', () => {
  const s = fixture();
  assert.deepEqual(releaseDue(s, new Date('2026-09-15T03:16:59Z')), []);
  assert.deepEqual(releaseDue(s, new Date('2026-09-15T03:17:01Z')), ['example-guide']);
  assert.equal(s.articles.get('example-guide').status, 'published');
  assert.equal(s.queue.items[0].state, 'released');
  assert.deepEqual(releaseDue(s, new Date('2026-09-15T03:18:00Z')), []);
});
test('changed copy invalidates approval before any release', () => {
  const s = fixture(); s.articles.get('example-guide').title = 'Unreviewed claim';
  assert.throws(() => releaseDue(s, new Date('2026-09-15T03:18:00Z')), /changed after approval/);
  assert.equal(s.articles.get('example-guide').status, 'draft');
});
test('changed schedule and absent approval evidence fail closed', () => {
  const s = fixture(); s.queue.items[0].scheduledAt = '2026-09-16T03:17:00Z';
  assert.throws(() => validate(s));
  const t = fixture(); delete t.queue.items[0].approval.evidence;
  assert.throws(() => validate(t), /missing approval evidence/);
});
test('unapproved and expired work cannot publish', () => {
  const s = fixture(); s.queue.items[0].state = 'in_review'; delete s.queue.items[0].approval;
  assert.deepEqual(releaseDue(s, new Date('2026-09-15T04:00:00Z')), []);
  s.articles.get('example-guide').status = 'published';
  assert.throws(() => validate(s), /unapproved content is public/);
  const t = fixture();
  assert.throws(() => releaseDue(t, new Date('2026-09-17T03:17:00Z')), /slot expired/);
});
test('a duplicate primary query cannot quietly create a competing page', () => {
  const s = fixture(); s.queue.items.push({ slug: 'duplicate-guide', primaryKeyword: 'EXAMPLE GUIDE', state: 'backlog' });
  assert.throws(() => validate(s), /Duplicate primary intent/);
});
test('a batch cannot exceed the agreed two weekly articles', () => {
  const s = fixture();
  for (const slug of ['second-guide', 'third-guide']) {
    const a = structuredClone(s.articles.get('example-guide')); a.slug = slug;
    const item = structuredClone(s.queue.items[0]); item.slug = slug; item.primaryKeyword = slug; item.approval.contentHash = hashArticle(a);
    s.articles.set(slug, a); s.queue.items.push(item);
  }
  assert.throws(() => releaseDue(s, new Date('2026-09-15T03:18:00Z')), /Weekly article limit/);
  assert([...s.articles.values()].every(a => a.status === 'draft'));
});
test('live verification rejects successful HTTP responses containing an old revision', async () => {
  const s = fixture(); const a = s.articles.get('example-guide');
  a.publishedAt = '2026-09-01T03:17:00Z'; a.updatedAt = a.publishedAt;
  const i = s.queue.items[0]; i.scheduledAt = a.publishedAt; i.approval.scheduledAt = a.publishedAt; i.approval.contentHash = hashArticle(a);
  releaseDue(s, new Date('2026-09-01T03:18:00Z'));
  const url = `${origin}/insights/example-guide/`;
  const fetcher = async target => {
    const pathname = new URL(target).pathname;
    const pages = { '/': '<a href="/insights/">Insights</a>', '/insights/': '<a href="/insights/example-guide/">Guide</a>', '/robots.txt': `Sitemap: ${origin}/sitemap.xml`, '/sitemap.xml': url, '/insights/example-guide/': `<h1>Old content</h1><link rel="canonical" href="${url}">` };
    return { url: target, status: pathname in pages ? 200 : 404, text: async () => pages[pathname] || 'Not found' };
  };
  await assert.rejects(verifyLive(s, fetcher), /live version differs/);
});
