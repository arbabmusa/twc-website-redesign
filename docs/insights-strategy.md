# TWC Insights: international inbound strategy

Prepared 9 September 2026. Audience direction confirmed: international clients first.

## The recommendation

Build an editorial system around the decisions people make before hiring TWC. Publish two useful articles a week, connecting each to a relevant service, credible work, and a project conversation. The purpose is qualified enquiries for Film & Content, Brand & Identity, and Systems & Software—not an undifferentiated traffic target.

For the first quarter, focus on English-speaking founders and marketing leads at growing businesses. Treat geography as a sales targeting decision to validate, rather than creating country or city pages without genuine local relevance. Initial allocation: 10 systems/website articles, 8 brand articles, 6 film/content articles. This is a proposed starting mix; adjust using lead quality and delivery priorities.

Use repeatable research, briefs, metadata, links, and checks. Give every article original value through a TWC checklist, decision framework, worked example, approved project breakdown, or reusable template. Do not multiply the same article across locations or industries by changing a few words.

## What the review found

| Finding | Evidence | Implication |
| --- | --- | --- |
| Existing site uses Next.js App Router and static export | Repository package.json and next.config.ts | Articles can be generated as complete HTML without a CMS migration. A publish requires a rebuild and deployment. |
| Services live together on the homepage | Services.tsx and live homepage | Add dedicated service destinations to convert high-intent visitors and support article links. |
| No Insights route, sitemap, or robots generator in the original checkout | Repository inspection | New implementation adds these foundations. |
| Live homepage redirects to www | Live website retrieval | New Insights canonical URLs use https://www.thewidercollective.com. |
| Existing menu anchors were page-relative | Navbar.tsx | Fixed navigation so Work, Services, and Contact lead back to homepage sections from article pages. |
| Current technical performance and organic baseline are unknown | No Search Console, analytics, or field-performance data inspected | Establish the baseline before forecasting traffic or claiming a ranking gain. |

Live robots and sitemap could not be verified through the web retrieval tool; their absence in the repository is the confirmed finding. No rankings, volumes, keyword difficulty scores, backlinks, or conversions have been measured in this review.

## Architecture

The prepared branch adds `/insights/` and `/insights/[slug]/`, with three topic sections matching TWC’s actual services. Each article has a canonical URL, unique title and description, readable HTML, publication/update dates, an organization byline, a direct takeaway, a table of contents, sources where applicable, related reading, and a contextual enquiry link. Article and BreadcrumbList structured data describe the visible content. Published articles enter the sitemap automatically.

The initial implementation uses a JSON file per article. It avoids adding a CMS before the editorial workflow is proven. Each record holds its slug, title, summary, category, status, timestamps, byline, sections, sources, related articles, and CTA. Content is rendered as text, without executing article HTML or MDX. Validation runs before builds. Drafts and future-dated articles are excluded from article routes, the index, and the sitemap.

**Important static-site behaviour:** passing a scheduled date does not publish a page by itself. An approved article must be included in a successful build and deployment. A failed build must leave the previous production version intact. Hosting-level 404 behaviour and redirect rules must be checked at deployment.

### Next commercial pages

Create these as separate, useful pages once TWC’s exact offers and proof are selected. These are recommendations, not routes implemented in this branch.

| Proposed destination | Buyer intent | Content needed |
| --- | --- | --- |
| `/services/website-design-development/` | Commission a new site or redesign | Fit, deliverables, content/migration approach, CMS options, verified work, process, handover, enquiry |
| `/services/brand-identity/` | Launch or reposition a brand | Strategy boundaries, identity system, applications, rollout, verified work, enquiry |
| `/services/film-content/` | Commission film or ongoing content | Formats, production model, international logistics, deliverables, usage assumptions, verified work, enquiry |
| `/services/automation-software/` | Improve an operational process | Suitable problems, discovery, integrations, testing, support, demonstrable examples, enquiry |

Until those pages exist, article CTAs use the established TWC email and link to the homepage services section. Do not add links to nonexistent service pages. Add reciprocal article links when each service page launches.

## Search and AI discovery

Google’s guidance says established SEO principles also apply to AI search features; there is no special markup that guarantees inclusion. Prioritise original, reliable content and accessible pages. Google also cautions against generating many pages without additional value. Sources: [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [generative AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

For ChatGPT search, permit OAI-SearchBot and ensure the host/CDN does not block it. Search crawling and model-training preferences are separate controls. The implementation explicitly allows the search crawler; it makes no new training-specific policy. Source: [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

Use clear definitions, meaningful headings, relevant sources, accurate dates, and consistent company identity because they help readers understand and verify the work. Add real author profiles when TWC appoints contributors. The current byline honestly uses the organization; the code does not invent an expert reviewer. `llms.txt` is not a launch requirement, and neither schema nor crawler access guarantees rankings or AI citations.

Retain a single canonical version of each article. Avoid indexable tag archives with one post, date archives, query-string duplicates, and superficial geographic copies. Keep articles in English initially; introduce translated content only with a real audience need and language-specific review.

## Direction from competitor research

Two international comparators demonstrate that buyers are already served detailed commissioning content. This is a format and positioning observation, not a ranking comparison.

| Comparator | Observed content | TWC opportunity |
| --- | --- | --- |
| Ramotion | A website RFP guide and a detailed web-design service page | Publish a concise working brief and proposal comparison worksheet, with clearer scope and handover questions. |
| Casual | Production briefing, pre-production services, and remote project collaboration | Connect film advice to concrete delivery matrices, review practices, and version planning. |

Sources: [Ramotion RFP guide](https://www.ramotion.com/blog/website-design-rfp/), [Ramotion web design](https://www.ramotion.com/web-design/), [Casual pre-production](https://www.casualfilms.com/pre-production), [Casual project collaboration](https://www.casualfilms.com/smart-projects). Differentiate with TWC’s own working materials and approved project evidence; do not paraphrase these competitors into near-duplicate articles.

## Twelve-week editorial calendar

Cadence: Tuesday and Thursday. Dates begin after launch approval; week numbers avoid committing to publication before the architecture is deployed. Each row is one distinct primary search intent. Keyword phrases are hypotheses, not measured volume or difficulty. H/M indicate proposed business priority, not ranking ease. The three sample guides already prepared correspond to weeks 1–2 and must be reviewed before deployment.

| Week | Slot | Article / primary query | Intent; priority | Original value to prepare | Conversion destination |
| --- | --- | --- | --- | --- | --- |
| 1 | Tue | How to write a website redesign brief / website redesign brief | Commercial; H | Copyable brief; sample requirements inventory | Website brief enquiry |
| 1 | Thu | What should a brand identity project include? / brand identity deliverables | Commercial; H | Deliverables acceptance checklist | Brand scope enquiry |
| 2 | Tue | How to brief a brand film production team / brand film brief | Commercial; H | Shoot inputs and delivery checklist | Film brief enquiry |
| 2 | Thu | Website redesign costs: what changes the scope / website redesign cost factors | Commercial; H | Itemised scope model; no invented price bands | Website scoping call |
| 3 | Tue | Brand refresh or full rebrand? / brand refresh vs rebrand | Commercial; H | Decision tree with labelled hypothetical examples | Brand diagnosis |
| 3 | Thu | Choosing a CMS your marketing team can maintain / how to choose a CMS | Commercial; H | Editor-task comparison; current primary documentation | Website discovery |
| 4 | Tue | Brand film, explainer, or product demo? / brand film vs explainer video | Commercial; H | Format-to-objective matrix | Film format consultation |
| 4 | Thu | How to compare website agency proposals / compare website design proposals | Commercial; H | Like-for-like comparison worksheet | Proposal scope discussion |
| 5 | Tue | What makes brand guidelines usable? / brand guidelines checklist | Informational; H | Test a guideline with a real editing task | Identity system enquiry |
| 5 | Thu | Website redesign without losing valuable pages / website redesign SEO migration checklist | Informational; H | URL inventory and redirect checklist | Website migration enquiry |
| 6 | Tue | Planning a month of content from one production / repurpose brand video shoot | Commercial; H | Shot-to-deliverable planning matrix | Content production brief |
| 6 | Thu | Rebrand rollout: website, sales deck, and social / rebrand rollout checklist | Informational; H | Dependency-based rollout board | Brand rollout project |
| 7 | Tue | A B2B website content plan that supports sales / B2B website content strategy | Commercial; H | Buyer questions mapped to page purpose | Website strategy enquiry |
| 7 | Thu | Hiring a remote brand agency: what to agree first / remote branding agency process | Commercial; H | Working-hour, approval, and handover checklist | International brand enquiry |
| 8 | Tue | How to review a video without endless revisions / video production feedback process | Informational; M | Annotated hypothetical feedback examples | Film production conversation |
| 8 | Thu | Before automating a workflow, map these five things / business workflow automation checklist | Commercial; H | Trigger-owner-exception map; sample clearly labelled | Automation discovery |
| 9 | Tue | Positioning before visual identity: what to decide / brand positioning before design | Informational; M | Positioning inputs worksheet | Brand strategy enquiry |
| 9 | Thu | Website handover: what your team should receive / website handover checklist | Commercial; H | Access, code, content, and training checklist | Website delivery discussion |
| 10 | Tue | Video production costs: the variables buyers miss / video production cost factors | Commercial; H | Budget components and deliverables; approved data only | Film scope enquiry |
| 10 | Thu | Brand templates an in-house team can actually use / brand templates for marketing teams | Commercial; M | Template acceptance test with realistic content | Brand application project |
| 11 | Tue | Custom tool or existing software? / custom software vs off the shelf | Commercial; H | Decision worksheet covering maintenance and exceptions | Systems discovery |
| 11 | Thu | Planning a remote video project across time zones / remote video production workflow | Commercial; M | Approval timeline and responsibilities | International production enquiry |
| 12 | Tue | When a growing company needs a brand system / when to invest in brand identity | Commercial; H | Team/channel complexity diagnostic | Brand scope call |
| 12 | Thu | What to measure after a B2B website launch / B2B website conversion metrics | Informational; H | Measurement plan joining pages to qualified enquiries | Website optimisation enquiry |

Weeks 4, 8, and 12 also include a short performance review outside the two publishing slots. Refresh articles when facts change; do not change timestamps merely to look fresh. If a queued article is weak or duplicates an existing intent, improve an existing guide or skip the slot.

## Repeatable article brief

Every production brief must include: target buyer; one primary question; search intent; existing pages that could overlap; a plain answer; distinctive TWC contribution; outline; factual claims and sources; internal links; next action; owner; reviewer; and publication state.

Recommended article shape: a direct answer, the decision context, practical steps or comparisons, a concrete worksheet/example, common scope questions where useful, and a service-specific CTA. Length follows the question. A longer article is not automatically better. Do not append generic FAQs to every page or invent customer outcomes.

Use TWC’s plain, direct voice. Explain tradeoffs without cheap-outsourcing positioning, unsupported superlatives, invented US/UK offices, or blanket promises about turnaround and costs. Mention cross-border delivery only where it answers a real buying question. Quote prices only after current TWC pricing and assumptions are approved for public use.

## Editorial operation

1. Select the next backlog item and check existing titles, search intent, and sales relevance.
2. Research current claims using original documentation and authoritative sources. Record URLs and retrieval dates in the working brief.
3. Add TWC-specific value: a usable worksheet, an approved example, or a subject-matter contribution. Mark missing evidence as blocked.
4. Draft the article, metadata, source list, links, and CTA. Keep it in draft state.
5. Review factual accuracy, originality, service fit, confidential information, and the usefulness of the next action.
6. Validate content and run the production build. Inspect desktop/mobile output and check links, canonicals, structured data, sitemap membership, and missing-page behaviour.
7. Approve the specific article and deploy through the existing hosting workflow. Verify the live URL and sitemap; record the published URL and date.
8. Review enquiries and search performance, then adjust the backlog.

Suggested owners: an editorial operator handles research and drafts; a relevant TWC service lead checks the substance; the website maintainer validates and releases. Appoint actual people before operational launch. The founder should review the first six articles to establish the standard; later reviews can be delegated within TWC.

The accompanying recurrence proposal is for twice-weekly draft preparation in this task. It does not send messages, merge code, or publish content. Deployment and autopublishing must be connected to the actual host before a fully automatic release can be promised. Avoid duplicate schedulers; check existing jobs before activation.

## Measurement

Before launch, verify the canonical property in Search Console, submit the sitemap, and connect the site’s chosen analytics. Set up enquiry attribution before expecting the calendar to demonstrate revenue impact. No analytics integration has been added in this foundation.

Record article slug, landing page, referrer, campaign parameters when present, CTA clicks, successful form submission or booking, service interest, and whether the enquiry is qualified. Email-link clicks are an interest signal, not a confirmed lead. Do not count them as submissions. If using Calendly, track completed bookings through its supported integration and test it. Avoid personal information in analytics events.

| Timing | Review | Decision |
| --- | --- | --- |
| Before launch | Indexability, existing traffic, conversions, ownership | Set a baseline and choose qualified-lead criteria |
| 30 days | Published/indexed pages, relevant impressions, CTA use | Resolve discovery issues and improve weak next actions |
| 60 days | Queries, clicks, service interest, enquiry quality | Expand the clusters attracting appropriate buyers |
| 90 days | Qualified enquiries, opportunities, content-assisted pipeline | Keep, refocus, or reduce each content cluster |

Track attributable AI referrals alongside other sources. Use a small fixed set of buyer questions for periodic manual citation checks, recording date and product; treat these as directional observations, not a stable ranking. No specific traffic, lead, or AI-listing outcome is guaranteed.

## Launch order and status

**Prepared now:** Insights architecture, navigation integration, three sample guides, sitemap/robots, content validation, this 24-topic strategy, and publishing documentation.

**Before production:** review sample copy and dates, inspect the branch, confirm the hosting release path, check pre-existing dependency audit findings, and deploy. The sample articles are marked published within the local branch to allow review of exported pages; they have not been posted to the live website. Set them to draft or update their publication timestamps if they are not approved for launch.

**Next priority:** build the four commercial service destinations; connect analytics and Search Console; assign editorial owners; activate the recurring draft workflow. Add case-study links only after selecting the relevant public work and confirming the claims used.
