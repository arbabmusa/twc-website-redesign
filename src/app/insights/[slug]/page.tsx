import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components";
import { formatDate, getInsight, getInsights, readingMinutes, insightRevision } from "@/lib/insights";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return getInsights().map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getInsight((await params).slug);
  if (!article) return { title: "Insight not found", robots: { index: false } };
  return { title: `${article.title} | TWC`, description: article.description,
    other: { "twc-insight-revision": insightRevision(article) },
    alternates: { canonical: siteUrl(`/insights/${article.slug}/`) },
    openGraph: { title: article.title, description: article.description, type: "article", url: siteUrl(`/insights/${article.slug}/`), publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author] },
    twitter: { card: "summary", title: article.title, description: article.description } };
}
export default async function InsightPage({ params }: Props) {
  const article = getInsight((await params).slug);
  if (!article) notFound();
  const url = siteUrl(`/insights/${article.slug}/`);
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${url}#article`, headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt, mainEntityOfPage: url, author: { "@type": "Organization", name: article.author, url: siteUrl() }, publisher: { "@type": "Organization", name: "The Wider Collective", url: siteUrl() } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl() }, { "@type": "ListItem", position: 2, name: "Insights", item: siteUrl("/insights/") }, { "@type": "ListItem", position: 3, name: article.title, item: url }] }
  ] };
  const related = article.relatedSlugs.map(getInsight).filter((a) => a !== undefined);
  return <><Navbar /><main className="insights-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb" className="insights-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/insights/">Insights</Link><span>/</span><span aria-current="page">{article.category}</span></nav>
    <article>
      <header className="insights-article-header"><p className="insights-eyebrow">{article.category}</p><h1>{article.title}</h1><p className="insights-deck">{article.description}</p><div className="insights-byline">By {article.author} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · {readingMinutes(article)} min read{article.updatedAt !== article.publishedAt && <> · Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></>}</div></header>
      <div className="insights-article-layout"><aside className="insights-toc"><p className="insights-eyebrow">IN THIS GUIDE</p><nav aria-label="Table of contents">{article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}</nav></aside><div className="insights-prose"><div className="insights-answer"><p className="insights-eyebrow">THE TAKEAWAY</p><p>{article.takeaway}</p></div>{article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}{article.sources.length > 0 && <section><h2>Further reading</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.title}</a></li>)}</ul></section>}<aside className="insights-cta"><h2>Put it into practice.</h2><p>Bring your goals and open questions. We can help you shape the brief.</p><a href={`mailto:hello@thewidercollective.com?subject=${encodeURIComponent(article.cta.subject)}`}>{article.cta.label} ↗</a><Link href="/#services">Explore TWC’s services</Link></aside></div></div>
    </article>
    {related.length > 0 && <section className="insights-related"><h2>Keep thinking.</h2>{related.map((item) => <Link key={item.slug} href={`/insights/${item.slug}/`}>{item.title} ↗</Link>)}</section>}
    <Link className="insights-back" href="/insights/">← All insights</Link>
  </main><Footer /></>;
}
