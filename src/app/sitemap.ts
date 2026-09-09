import type { MetadataRoute } from "next";
import { getInsights } from "@/lib/insights";
import { siteUrl } from "@/lib/site";
import { caseStudies } from "@/data/case-studies";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/press/", "/insights/", ...Object.values(caseStudies).map((item) => `/case-study/${item.slug}/`)].map((path) => ({ url: siteUrl(path) })),
    ...getInsights().map((article) => ({ url: siteUrl(`/insights/${article.slug}/`), lastModified: article.updatedAt }))
  ];
}
