import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

export const categories = ["Film & Content", "Brand & Identity", "Systems & Software"] as const;
export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: typeof categories[number];
  status: "draft" | "published";
  publishedAt: string;
  updatedAt: string;
  author: string;
  takeaway: string;
  sections: { id: string; heading: string; paragraphs: string[]; bullets?: string[] }[];
  sources: { title: string; url: string }[];
  relatedSlugs: string[];
  cta: { label: string; subject: string };
};

export function getInsights(): Insight[] {
  return fs.readdirSync(path.join(process.cwd(), "src/content/insights"))
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/content/insights", file), "utf8")) as Insight)
    .filter((article) => article.status === "published" && Date.parse(article.publishedAt) <= Date.now())
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export const getInsight = (slug: string) => getInsights().find((article) => article.slug === slug);
export function insightRevision(article: Insight) {
  const { status, ...content } = article;
  void status;
  return createHash("sha256").update(JSON.stringify(content)).digest("hex");
}
export const readingMinutes = (article: Insight) => Math.max(1, Math.ceil([article.takeaway, ...article.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])])].join(" ").split(/\s+/).length / 200));
export const formatDate = (date: string) => new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
