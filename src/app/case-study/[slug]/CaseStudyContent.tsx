"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use, useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { caseStudies, type VideoItem, type StaticItem } from "@/data/case-studies";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 as const },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      {...fadeUp}
      className="font-display text-3xl md:text-4xl font-bold mb-8"
    >
      {children}
    </motion.h2>
  );
}

function VideoPlayer({
  src,
  poster,
  title,
  isYouTube,
}: {
  src: string;
  poster?: string;
  title?: string;
  isYouTube?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (isYouTube || src.includes("youtube.com/embed")) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
        <iframe
          src={src}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={playing}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
      />
      {!playing && (
        <button
          onClick={() => {
            videoRef.current?.play();
            setPlaying(true);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-background ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}

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
              &larr; Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const nextStudy = study.nextCaseStudy
    ? caseStudies[study.nextCaseStudy]
    : null;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-0">
        {/* === HERO === */}
        <section className="px-6 max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              &larr; Back to Home
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-4xl"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10"
          >
            {study.subtitle}
          </motion.p>

          {/* KPI Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {study.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="px-5 py-3 rounded-full border border-border bg-muted/30 backdrop-blur-sm"
              >
                <span className="font-display font-bold text-accent">
                  {kpi.value}
                </span>
                <span className="text-muted-foreground ml-2 text-sm">
                  {kpi.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Hero Video */}
          {study.heroVideoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <VideoPlayer
                src={study.heroVideoUrl}
                poster={study.heroVideoPoster}
                title={study.title}
              />
            </motion.div>
          )}
        </section>

        {/* === MAIN CONTENT + SIDEBAR === */}
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="space-y-24">
              {/* --- Challenge --- */}
              <section>
                <SectionHeading>The Challenge</SectionHeading>
                <motion.p
                  {...fadeUp}
                  className="text-lg text-muted-foreground mb-8 max-w-3xl"
                >
                  {study.challengeIntro}
                </motion.p>
                {study.challengeCards && study.challengeCards.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {study.challengeCards.map((card, i) => (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-xl border border-border bg-muted/20"
                      >
                        <h3 className="font-display font-semibold mb-2">
                          {card.title}
                        </h3>
                        {card.description && (
                          <p className="text-sm text-muted-foreground">
                            {card.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              {/* --- Strategy --- */}
              <section>
                <SectionHeading>The Strategy</SectionHeading>
                <div className="space-y-6">
                  {study.strategy.map((step, i) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <span className="font-display font-bold text-accent text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-accent mb-1">
                          {step.phase}
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {study.strategicLevers && (
                  <motion.div
                    {...fadeUp}
                    className="mt-8 p-6 rounded-xl border border-border bg-muted/20"
                  >
                    <h4 className="font-display font-semibold mb-3">
                      Strategic Levers
                    </h4>
                    <ul className="space-y-2">
                      {study.strategicLevers.map((lever) => (
                        <li
                          key={lever}
                          className="flex gap-3 text-muted-foreground text-sm"
                        >
                          <span className="text-accent mt-0.5">&#9679;</span>
                          {lever}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </section>

              {/* --- Execution --- */}
              <section>
                <SectionHeading>The Execution</SectionHeading>
                <div className="grid sm:grid-cols-2 gap-6">
                  {study.execution.map((block, i) => (
                    <motion.div
                      key={block.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-6 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors"
                    >
                      <div className="text-xs uppercase tracking-wider text-accent mb-2">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-display font-semibold mb-2">
                        {block.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {block.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* --- Gallery --- */}
              {study.gallery.length > 0 && (
                <section>
                  <SectionHeading>Creative Gallery</SectionHeading>
                  <div className="space-y-16">
                    {study.gallery.map((section) => (
                      <div key={section.title}>
                        <motion.h3
                          {...fadeUp}
                          className="font-display text-xl font-semibold mb-6 text-muted-foreground"
                        >
                          {section.title}
                        </motion.h3>

                        {section.type === "video" && (
                          <div className="grid sm:grid-cols-2 gap-6">
                            {(section.items as VideoItem[]).map((item) => (
                              <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                              >
                                <VideoPlayer
                                  src={item.videoUrl}
                                  poster={item.thumbnailUrl}
                                  title={item.title}
                                />
                                <p className="mt-3 text-sm font-medium">
                                  {item.title}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {section.type === "reel" && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {(section.items as VideoItem[]).map((item) => (
                              <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center mb-3">
                                  <svg
                                    className="w-4 h-4 text-accent"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {item.title}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {section.type === "static" && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {(section.items as StaticItem[]).map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative aspect-square rounded-xl overflow-hidden bg-muted"
                              >
                                <img
                                  src={item.imageUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* --- NFT Gallery (Death Corp specific) --- */}
              {study.nftGallery && study.nftGallery.length > 0 && (
                <section>
                  <SectionHeading>The Piggies — NFT Collection</SectionHeading>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {study.nftGallery.map((nft, i) => (
                      <motion.div
                        key={nft.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-xl border border-border overflow-hidden bg-muted/10 hover:bg-muted/20 transition-colors"
                      >
                        <div className="aspect-square bg-muted">
                          <img
                            src={nft.imageUrl}
                            alt={nft.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {nft.id && (
                              <span className="text-xs font-mono text-accent">
                                #{nft.id}
                              </span>
                            )}
                            <h4 className="font-display font-semibold text-sm">
                              {nft.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {nft.lore}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* --- Results --- */}
              <section>
                <SectionHeading>The Results</SectionHeading>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {study.results.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="p-6 rounded-xl border border-border bg-muted/10"
                    >
                      <div className="font-display text-3xl font-bold text-accent mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium mb-1">
                        {metric.label}
                      </div>
                      {metric.context && (
                        <div className="text-xs text-muted-foreground">
                          {metric.context}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {study.resultsSummary && (
                  <motion.p
                    {...fadeUp}
                    className="text-lg text-muted-foreground max-w-3xl"
                  >
                    {study.resultsSummary}
                  </motion.p>
                )}
              </section>

              {/* --- Testimonial --- */}
              <section>
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative p-8 md:p-12 rounded-2xl border border-accent/20 bg-accent/5"
                >
                  <svg
                    className="absolute top-6 left-6 w-10 h-10 text-accent/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 relative z-10">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </p>
                  <footer className="relative z-10">
                    <div className="font-display font-semibold">
                      {study.testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {study.testimonial.company}
                    </div>
                  </footer>
                </motion.blockquote>
              </section>

              {/* --- What's Next --- */}
              <section>
                <SectionHeading>What&apos;s Next</SectionHeading>
                <div className="space-y-4">
                  {study.whatsNext.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start p-4 rounded-xl border border-border bg-muted/10"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-accent">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-muted-foreground pt-1">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* === STICKY SIDEBAR === */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Snapshot */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl border border-border bg-muted/10"
                >
                  <h3 className="font-display font-bold text-lg mb-5">
                    Snapshot
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Industry
                      </dt>
                      <dd className="text-sm font-medium">
                        {study.snapshot.industry}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Region
                      </dt>
                      <dd className="text-sm font-medium">
                        {study.snapshot.region}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Timeline
                      </dt>
                      <dd className="text-sm font-medium">
                        {study.snapshot.timeline}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Team Size
                      </dt>
                      <dd className="text-sm font-medium">
                        {study.snapshot.teamSize}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Services
                      </dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {study.snapshot.services.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 text-xs rounded-full border border-border bg-muted/30"
                          >
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                    {study.snapshot.channels && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                          Channels
                        </dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {study.snapshot.channels.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 text-xs rounded-full border border-accent/30 text-accent"
                            >
                              {c}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Tools
                      </dt>
                      <dd className="text-xs text-muted-foreground">
                        {study.snapshot.tools.join(" · ")}
                      </dd>
                    </div>
                  </dl>
                </motion.div>

                {/* CTA Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl border border-accent/20 bg-accent/5"
                >
                  <h3 className="font-display font-bold mb-3">
                    Want results like this?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    30-minute strategy call. No pitch deck.
                  </p>
                  <Link
                    href="https://calendly.com/thewidercollective/discovery"
                    target="_blank"
                    className="block text-center px-5 py-3 bg-accent text-background rounded-full font-medium text-sm hover:scale-105 transition-transform"
                  >
                    Book a Free Call
                  </Link>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>

        {/* === FOOTER CTA === */}
        <section className="mt-24 py-24 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              {...fadeUp}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              {study.ctaHeading || "Let\u2019s talk strategy."}
            </motion.h2>
            <motion.p
              {...fadeUp}
              className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              {study.ctaSubheading ||
                "30 minutes. No pitch deck. Just a real conversation about what\u2019s working, what\u2019s not, and what we\u2019d do."}
            </motion.p>
            <motion.div {...fadeUp}>
              <Link
                href="https://calendly.com/thewidercollective/discovery"
                target="_blank"
                className="inline-flex items-center gap-2 px-10 py-4 text-lg font-bold bg-accent text-background rounded-full hover:scale-105 transition-transform"
              >
                Book a Free Strategy Call
              </Link>
            </motion.div>
          </div>
        </section>

        {/* === NEXT CASE STUDY === */}
        {nextStudy && (
          <section className="py-16 px-6 border-t border-border">
            <div className="max-w-7xl mx-auto">
              <motion.div
                {...fadeUp}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Next Case Study
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {nextStudy.title.split(":")[0]}
                  </h3>
                </div>
                <Link
                  href={`/case-study/${study.nextCaseStudy}`}
                  className="px-6 py-3 border border-border rounded-full hover:bg-muted/30 transition-colors font-medium text-sm"
                >
                  View Case Study &rarr;
                </Link>
              </motion.div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
