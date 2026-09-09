# Insights foundation validation

9 September 2026

- Production build passed on the repository's locked dependencies (Next.js 15.5.14), including TypeScript checks and static export.
- Content validation passed for all three samples: unique slug/title, allowed categories and status, required fields, dates, section IDs, source URL format, and related references.
- Exported index and all three article pages passed checks for a single H1, canonical origin, and existing internal link destinations.
- Each article exports parseable Article and BreadcrumbList JSON-LD and appears in the sitemap.
- robots.txt explicitly allows OAI-SearchBot.
- During validation, future timestamps correctly withheld two sample pages; dates were corrected and all three then exported successfully. This confirms future-date exclusion in the build, not an automated release schedule.
- Git whitespace/error check passed.

## Outstanding before release

Visual desktop/mobile inspection could not run: the browser refused local access because it could not verify the administrator-enforced policy. No browser control was bypassed. Responsive CSS is implemented but visual quality is not verified.

The dependency install reported 10 existing advisories (1 low, 2 moderate, 6 high, 1 critical). Their applicability and fixes have not been assessed. No dependency versions were changed as part of Insights.

The live host and deployment integration were not modified. Live 404 behaviour, canonical redirects, indexing, field performance, source-link availability, analytics, and actual enquiry/booking attribution still need launch verification. There is no claim of production deployment, article editorial approval, rankings, or conversion results.
