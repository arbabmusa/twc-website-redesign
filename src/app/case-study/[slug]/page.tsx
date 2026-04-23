import { CaseStudyContent } from "./CaseStudyContent";
import { caseStudies, caseStudySlugs } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Case study not found" };
  return {
    title: `${study.client} — ${study.title} | The Wider Collective`,
    description: study.summary,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CaseStudyContent params={params} />;
}
