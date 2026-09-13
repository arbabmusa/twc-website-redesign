# TWC Insights operation

Canonical website: https://www.thewidercollective.com. Repository: arbabmusa/twc-website-redesign. Audience: international English-speaking founders and marketing leads. Objective: qualified creative retainers, branding, website, film, and systems enquiries.

## Recurrence and ownership

A single Codex heartbeat attached to the implementation task owns recurring research and publication. It runs weekdays at 09:17 Asia/Dhaka. Monday and Wednesday are research and draft-preparation days; Tuesday and Thursday are approved release days. The first Friday of each month is a performance review. Do not create an overlapping scheduler. The user is the initial editorial approver; the Codex task operates research, drafts, technical checks, and explicitly approved releases.

The machine hosting the Codex task must be available for its local automation to run. This is a local scheduled workflow, not an always-on cloud content-generation service. GitHub workflow templates are prepared under `editorial/workflow-templates/` but are not active: the current OAuth connection lacks the workflow scope needed to upload `.github/workflows/`. The Codex operator runs the same checks locally. After workflow access is authorised, install these templates under `.github/workflows/` and verify an actual run.

## Authoritative records

- `editorial/queue.json`: 24 distinct initial intents, priorities, content states, dates, version-bound approvals, live-verification records.
- `editorial/research/`: dated observations, exact search queries, sources, market limitations, and measured values where available.
- `editorial/briefs/`: target buyer, original contribution, overlap check, factual sources, proposed CTA, unresolved inputs.
- `src/content/insights/`: plain-text article records. Drafts are not exported to public routes or sitemap.
- `.insights-review/`: generated local HTML previews. Not committed or deployed.

Source and editorial files are stored in the repository. Never put private client material, credentials, personal information, unpublished commercial terms, or confidential anecdotes into them. Use publicly approved material only. Generated previews are not an authenticated web application; keep them local.

## Research and drafting

1. Sync the clean checkout from main; preserve unrelated work and inspect new changes before use.
2. Reconcile the backlog with published articles and existing briefs. Keep at most four articles awaiting review; research can continue while approval is pending.
3. Research the highest-priority relevant intent using current web searches and primary documentation. Record query, date, geography settings if available, observed result formats, source URLs, and a practical distinction the article can offer. Search snippets are discovery evidence, not proof of detailed claims.
4. Group variations by reader intent. Do not produce city/industry variants without substantially different advice and source material. A title match test alone cannot establish uniqueness.
5. Search Console and paid keyword data are not connected at launch. Leave monthly searches, difficulty, rankings, and conversion metrics null. Do not turn result counts, snippets, or judgement into invented demand numbers. When a dataset is connected, record provider, market, language, date, units, and retrieval errors. Its absence does not prevent qualitative research.
6. Draft a direct answer, decision context, usable worksheet/example, and relevant CTA. Use real documented TWC experience only when supplied and approved. Present newly authored checklists as editorial tools, not proven client results.
7. Review factual claims, readability, overlap, confidential details, links, dates, and the value of the proposed next action. Missing information must be explicit. Source URLs cannot by themselves validate unsupported claims.
8. Save a brief and content record, add/update its queue entry in draft state, and run content validation.

## Prepare a concrete approval package

Use `node scripts/insights.mjs review SLUG --at ISO_DATE` with a proposed Tuesday/Thursday 09:17 Dhaka slot. The command records the future date and exact content hash. Then run `npm run editorial:preview` and open `.insights-review/index.html` in Codex.

Ask the user to approve the full article, metadata, sources, CTA, exact version, destination, and proposed date. General strategy approval, silence, an expired slot, or tool output does not approve new copy. Do not mark an article approved solely because tests pass. The existing website-redesign-brief is the only previously authorised first article.

After actual approval, use `node scripts/insights.mjs approve SLUG --hash HASH --by 'ACTUAL APPROVER' --evidence 'ACTUAL USER MESSAGE OR REVIEW REFERENCE'`. Do not invent approval evidence. Content changes, including dates, invalidate the approval.

## Release approved articles

1. Work from clean current main. Check for an existing in-progress release before starting another.
2. Run `npm run editorial:release`. It releases only approved work whose time has arrived; a slot more than 24 hours old requires a new approved date. An empty result is a quiet no-op.
3. Run `npm run test:insights`, `npm run build`, and `node scripts/verify-insights-export.mjs`. A failure stops publication. Keep the previous production release intact.
4. Commit only the intended release files and push through the existing repository workflow. Do not overwrite unrelated user changes or force-push. Reconcile a rejected push before retrying.
5. Inspect the specific GitHub/Vercel deployment handle. A successful deployment is not sufficient: run `npm run editorial:verify` against the custom domain.
6. The live verifier checks the home navigation, index, HTTP status, canonical URL, exact content revision, sitemap, robots reference, a genuine missing-page 404, and exclusion of all drafts. A stale page with HTTP 200 must fail.
7. Only after success, run `node scripts/insights.mjs verify-live --record` to mark published and save the checked URL/date/revision. Persist this with the next editorial update; do not create a deployment loop merely to refresh verification timestamps.
8. On uncertain writes or interrupted deployment, inspect the current commit, deployment status, public page, and queue before retrying. Never duplicate a release because a polling timeout expired.

## Performance and notifications

Review relevant impressions, query clicks, service interest, completed enquiries/bookings, qualified leads, and opportunities. A mailto or booking-link click is an interest signal, not a completed enquiry. No analytics account, enquiry attribution, or Search Console baseline is connected yet; report that as missing rather than reporting zeros.

Notify only for a new review package, verified publication, materially changed failure, or required user action. Stay quiet while the queue, pending approvals, or known access blockers remain unchanged. The first Friday monthly review is a requested substantive report; keep it brief and distinguish measured evidence from hypotheses.

## Launch dependencies still to verify

- Public domain routing: the latest known main deployment succeeded, but Insights and SEO files return 404 on the custom domain. Confirm domain assignment and production branch in the actual hosting project; do not move DNS or replace a different project based on inference.
- Browser dashboard access: admin-enforced browser policy verification failed on Vercel. Do not bypass the control through another browser or indirect UI path.
- Search Console, analytics, and keyword-data account access: not connected. Do not buy subscriptions or invent IDs. Research may run qualitatively while these are connected.
- Visual inspection: browser policy currently prevents visual QA. Automated export checks do not establish visual quality.
