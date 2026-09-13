import fs from 'node:fs';
import assert from 'node:assert/strict';
import { load, validate, origin, hashArticle } from './insights/editorial.mjs';
const state = validate(load());
const index = fs.readFileSync('out/insights/index.html', 'utf8');
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
assert(fs.readFileSync('out/index.html', 'utf8').includes('href="/insights/"'));
assert(fs.readFileSync('out/robots.txt', 'utf8').includes(`${origin}/sitemap.xml`));
for (const a of state.articles.values()) {
  const file = `out/insights/${a.slug}/index.html`;
  const route = `/insights/${a.slug}/`;
  if (a.status !== 'published' || Date.parse(a.publishedAt) > Date.now()) {
    assert(!fs.existsSync(file), `${a.slug}: draft exported`);
    assert(!index.includes(route), `${a.slug}: draft in index`);
    assert(!sitemap.includes(`${origin}${route}`), `${a.slug}: draft in sitemap`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert(html.includes(`rel="canonical" href="${origin}${route}"`));
  assert(html.includes(`name="twc-insight-revision" content="${hashArticle(a)}"`));
  assert(html.includes('application/ld+json'));
  assert(index.includes(route)); assert(sitemap.includes(`${origin}${route}`));
}
assert(fs.existsSync('out/404.html'));
console.log('Export verified: approved article versions, canonical URLs, navigation, sitemap, and draft exclusion.');
