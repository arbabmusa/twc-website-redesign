import { CaseStudyContent } from "./CaseStudyContent";

export function generateStaticParams() {
  return [
    { slug: "airasia" },
    { slug: "deathcorp" },
    { slug: "globalmission" },
    { slug: "yoyoso" },
    { slug: "manabay" },
    { slug: "gendergp" },
  ];
}

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CaseStudyContent params={params} />;
}
