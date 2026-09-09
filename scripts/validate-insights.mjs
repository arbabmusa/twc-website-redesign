import fs from 'node:fs';
import assert from 'node:assert/strict';
const directory = 'src/content/insights';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.json'));
const articles = files.map(file => ({ file, ...JSON.parse(fs.readFileSync(`${directory}/${file}`, 'utf8')) }));
const slugs = new Set();
const titles = new Set();
for (const a of articles) {
  assert.match(a.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(a.file, `${a.slug}.json`);
  assert(!slugs.has(a.slug), `Duplicate slug: ${a.slug}`); slugs.add(a.slug);
  assert(!titles.has(a.title.toLowerCase()), `Duplicate title: ${a.title}`); titles.add(a.title.toLowerCase());
  assert(['draft', 'published'].includes(a.status));
  assert(['Film & Content', 'Brand & Identity', 'Systems & Software'].includes(a.category));
  for (const field of ['title', 'description', 'author', 'takeaway']) assert(typeof a[field] === 'string' && a[field].trim(), `${a.slug}: missing ${field}`);
  for (const field of ['publishedAt', 'updatedAt']) assert(Number.isFinite(Date.parse(a[field])), `${a.slug}: invalid ${field}`);
  assert(Date.parse(a.updatedAt) >= Date.parse(a.publishedAt), `${a.slug}: update before publication`);
  assert(a.sections.length > 0);
  const ids = new Set();
  for (const section of a.sections) {
    assert.match(section.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert(!ids.has(section.id)); ids.add(section.id);
    assert(section.heading && section.paragraphs.length && section.paragraphs.every(p => typeof p === 'string' && p.trim()));
    if (section.bullets) assert(section.bullets.every(p => typeof p === 'string' && p.trim()));
  }
  for (const source of a.sources) assert(source.title && new URL(source.url).protocol === 'https:');
  assert(a.cta.label && a.cta.subject);
}
for (const a of articles) for (const slug of a.relatedSlugs) assert(slugs.has(slug) && slug !== a.slug, `${a.slug}: invalid related article ${slug}`);
console.log(`Validated ${articles.length} articles. Editorial accuracy and approval require human review.`);
