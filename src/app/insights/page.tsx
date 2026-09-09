import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components";
import { categories, getInsights, readingMinutes } from "@/lib/insights";
import { siteUrl } from "@/lib/site";

const title = "Insights | The Wider Collective";
const description = "Practical guides to commissioning film, building a brand, and developing better websites and systems. For founders and marketing teams.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: siteUrl("/insights/") },
  openGraph: { title, description, url: siteUrl("/insights/"), type: "website" },
};

export default function InsightsPage() {
  const articles = getInsights();
  const featured = articles[0];
  return <><Navbar /><main className="insights-shell">
    <header className="insights-intro">
      <p className="insights-eyebrow">THE WIDER COLLECTIVE / INSIGHTS</p>
      <h1>Better questions.<br /><span className="text-accent">Better work.</span></h1>
      <p className="insights-deck">Practical thinking on film, brand, and systems. For the decisions that come before the brief.</p>
    </header>
    {featured && <Link href={`/insights/${featured.slug}/`} className="insights-feature">
      <div><p className="insights-eyebrow">START HERE / {featured.category}</p><h2>{featured.title}</h2><p>{featured.description}</p><span className="insights-read">Read the guide <span aria-hidden="true">↗</span></span></div>
      <div className="insights-feature-note"><span className="insights-eyebrow">THE TAKEAWAY</span><p>{featured.takeaway}</p><span>{readingMinutes(featured)} min read</span></div>
    </Link>}
    <nav aria-label="Insight topics" className="insights-topics">{categories.map((category, i) => <a key={category} href={`#topic-${i}`}>{category} <span aria-hidden="true">↓</span></a>)}</nav>
    {categories.map((category, i) => <section id={`topic-${i}`} key={category} className="insights-topic"><h2>{category}</h2><div>{articles.filter((a) => a.category === category).map((article) => <article key={article.slug} className="insights-row"><Link href={`/insights/${article.slug}/`}><h3>{article.title} <span aria-hidden="true">↗</span></h3><p>{article.description}</p><span className="insights-eyebrow">{readingMinutes(article)} MIN READ</span></Link></article>)}{!articles.some((a) => a.category === category) && <p className="text-muted-foreground">New guides are on the way.</p>}</div></section>)}
    <aside className="insights-cta"><h2>Have a brief in mind?</h2><p>Tell us what you are trying to make, change, or solve.</p><Link href="mailto:hello@thewidercollective.com?subject=Let%E2%80%99s%20talk%20about%20a%20project">Talk to TWC ↗</Link></aside>
  </main><Footer /></>;
}
