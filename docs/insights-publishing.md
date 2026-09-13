# Publishing Insights

The active workflow is now documented in [editorial/OPERATING-GUIDE.md](../editorial/OPERATING-GUIDE.md). Use its version-bound review, approval, release, and public-verification commands; do not manually change a draft to published. The notes below describe the original static-site foundation.


Articles live in `src/content/insights/*.json`. Copy a sample record, give it a unique URL slug and title, and start with `status: "draft"`. No CMS credentials are needed. This is a static export; changes become public only after build and deployment.

Required record fields are illustrated by the three included articles. Category must be Film & Content, Brand & Identity, or Systems & Software. Use an honest author name, ISO timestamps with timezone, unique section IDs, HTTPS source URLs, and existing related slugs. Article content is plain text; use section paragraphs and bullets, not HTML.

## Review and publish

1. Complete the factual and editorial checks in insights-strategy.md. Automated validation does not establish originality, claims accuracy, or approval.
2. Prepare a future review date, record actual approval of the exact article hash, and use `npm run editorial:release` when the approved slot arrives. The editorial validator rejects manual publication without matching queue approval.
3. Run `npm run validate:insights`, then `npm run build`. The latter exports to `out/` and includes content validation automatically.
4. Preview the exported index and article pages on desktop and mobile. Check that CTAs are correct and all related/source links work.
5. Deploy `out/` through the existing host. Deployment configuration was not present in the inspected repository and has not been changed here. Confirm that nonexistent routes return a real 404, not the homepage with HTTP 200.
6. Check the live canonical URL, article content, robots.txt, and sitemap.xml. Record the result.

Drafts and future-dated content are excluded from all public article surfaces. Future-dated content needs another build after its date passes; there is no server-side scheduler. Never rely on the browser clock or simply pushing a future date to release an article.

Related links to unpublished articles are hidden by the renderer. Published pages can link to the current homepage services section until dedicated services pages launch. New public URL changes require a redirect in the deployment host; do not casually rename published slugs.

The canonical origin is defined in src/lib/site.ts. Keep it aligned with the production redirect and root metadata. Preview environments should be protected or use host-level noindex headers; do not submit preview URLs to search engines.

## Foundation scope

Included: static article routes, index/topic anchors, navigation and footer links, unique article metadata, Article/BreadcrumbList JSON-LD, dates/byline/read time, TOC, source links, related reading, contextual email CTA, sitemap, robots, and validation.

Connected in the operations update: local Codex research and approval-gated release schedule, 24-topic queue, private review previews, exact-version approval checks, and prepared GitHub quality/public-verification workflow templates (activation needs the connection’s workflow permission). Still requiring live verification or access: production domain routing, Search Console, analytics, keyword metrics, and booking confirmation tracking. The local schedule requires its Mac to be available.
