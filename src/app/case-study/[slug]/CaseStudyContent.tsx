"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const caseStudies: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
  services: string[];
  externalUrl: string;
}> = {
  airasia: {
    title: "AirAsia",
    subtitle: "1.1M users reached. $0.06 per lead.",
    description: "Pan-Asian market launch campaign that delivered unprecedented engagement rates across multiple markets.",
    image: "https://thewidercollective.com/assets/airasia-cover-A6P9r8aC.png",
    stats: [
      { label: "Reach", value: "1.1M" },
      { label: "CPL", value: "$0.06" },
      { label: "Markets", value: "5+" },
    ],
    services: ["Strategy", "Video", "Short-Form", "Paid Media", "Creative"],
    externalUrl: "https://thewidercollective.com/case-study/airasia",
  },
  deathcorp: {
    title: "Death Corp Piggies",
    subtitle: "3,333 NFTs. $500K generated.",
    description: "An apocalyptic pig IP on the Sui blockchain. They came to us with a napkin sketch. We built a universe.",
    image: "https://thewidercollective.com/assets/deathcorp-cover-BgPkz-vz.png",
    stats: [
      { label: "NFTs", value: "3,333" },
      { label: "Total", value: "$500K" },
      { label: "Days", value: "90" },
    ],
    services: ["Story", "Art", "NFTs", "Brand", "Web Dev", "Community"],
    externalUrl: "https://thewidercollective.com/case-study/deathcorp",
  },
  globalmission: {
    title: "Global Mission Institute",
    subtitle: "Complete brand transformation.",
    description: "Full rebrand with hero video and comprehensive brand guidelines. A fresh identity for 2026.",
    image: "https://thewidercollective.com/assets/gmi-cover-BRC-3QQX.png",
    stats: [
      { label: "Deliverables", value: "50+" },
      { label: "Videos", value: "3" },
      { label: "Guidelines", value: "1" },
    ],
    services: ["Brand", "Design", "Video", "Guidelines"],
    externalUrl: "https://thewidercollective.com/case-study/globalmission",
  },
  yoyoso: {
    title: "Yoyoso",
    subtitle: "2.5M reach. +40% footfall.",
    description: "80+ pastel creatives that drove massive engagement and real-world store visits.",
    image: "https://thewidercollective.com/assets/yoyoso-cover-aHCgoYuI.png",
    stats: [
      { label: "Reach", value: "2.5M" },
      { label: "Footfall", value: "+40%" },
      { label: "Creatives", value: "80+" },
    ],
    services: ["Influencer", "UGC", "Paid Media", "Creative"],
    externalUrl: "https://thewidercollective.com/case-study/yoyoso",
  },
};

export function CaseStudyContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const study = caseStudies[slug];

  if (!study) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Case study not found</h1>
            <Link href="/" className="text-accent hover:underline">
              ← Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-12 items-center mb-16"
          >
            <div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
                {study.title}
              </h1>
              <p className="text-2xl text-accent mb-4">{study.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-8">
                {study.description}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-8">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 text-sm border border-border rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <Link
                href={study.externalUrl}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-full font-medium hover:scale-105 transition-transform"
              >
                View Full Case Study →
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-8 max-w-2xl"
          >
            {study.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
