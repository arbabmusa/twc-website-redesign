"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  caseStudies,
  type HeroMedia,
  type GalleryItem,
  type GallerySection,
} from "@/lib/case-studies";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const aspectClass: Record<string, string> = {
  "9/16": "aspect-[9/16]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
};

function HeroMediaBlock({ media, alt }: { media: HeroMedia; alt: string }) {
  if (media.kind === "video") {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={media.poster}
          className="w-full h-full object-cover"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      </div>
    );
  }
  if (media.kind === "youtube") {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${media.id}?rel=0&modestbranding=1`}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-[#2a2b32]">
      <img
        src={media.src}
        alt={alt}
        className="w-full h-full object-contain p-8 md:p-16"
      />
    </div>
  );
}

function GalleryMedia({ item }: { item: GalleryItem }) {
  const aspect = aspectClass[item.aspect];
  if (item.kind === "video") {
    return (
      <div
        className={`relative ${aspect} w-full rounded-xl overflow-hidden border border-border bg-black group`}
      >
        <video
          loop
          muted
          playsInline
          preload="metadata"
          poster={item.poster}
          className="w-full h-full object-cover"
          onMouseEnter={(e) => {
            const v = e.currentTarget;
            v.play().catch(() => {});
          }}
          onMouseLeave={(e) => {
            const v = e.currentTarget;
            v.pause();
            v.currentTime = 0;
          }}
        >
          <source src={item.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-background/70 backdrop-blur-sm border border-accent/40 flex items-center justify-center">
            <span className="block w-0 h-0 border-l-[12px] border-l-accent border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
          </div>
        </div>
        {item.title && (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
            <p className="text-sm text-white">{item.title}</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`relative ${aspect} w-full rounded-xl overflow-hidden border border-border bg-muted/20`}
    >
      <img
        src={item.src}
        alt={item.title ?? ""}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      {item.title && (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <p className="text-sm text-white">{item.title}</p>
        </div>
      )}
    </div>
  );
}

function GallerySectionBlock({ section }: { section: GallerySection }) {
  if (section.layout === "scroll") {
    return (
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {section.heading}
        </h3>
        <div
          className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {section.items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[220px] md:w-[260px] snap-start"
            >
              <GalleryMedia item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  const gridClass =
    section.layout === "grid-2"
      ? "grid md:grid-cols-2 gap-4"
      : "grid grid-cols-2 md:grid-cols-3 gap-4";
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {section.heading}
      </h3>
      <div className={gridClass}>
        {section.items.map((item, i) => (
          <GalleryMedia key={i} item={item} />
        ))}
      </div>
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
            <h1 className="font-display text-4xl font-bold mb-4">
              Case study not found
            </h1>
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
        <section className="relative px-6 pt-8 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <Link
                href="/#work"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to work
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm uppercase tracking-[0.2em] text-accent mb-4"
            >
              Case study · {study.industry}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-balance"
            >
              <span className="text-muted-foreground/60">{study.client}.</span>{" "}
              {study.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-12"
            >
              {study.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 border border-border/50 rounded-xl overflow-hidden mb-16"
            >
              {study.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="bg-background p-6 md:p-8 flex flex-col gap-2"
                >
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {kpi.label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-accent">
                    {kpi.value}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroMediaBlock
                media={study.heroMedia}
                alt={`${study.client} hero`}
              />
            </motion.div>
          </div>
        </section>

        {/* Snapshot + Challenge */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <motion.div {...fadeUp} className="space-y-5">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                The challenge
              </h2>
              {study.challenge.map((p, i) => (
                <p
                  key={i}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            <motion.aside
              {...fadeUp}
              className="lg:sticky lg:top-28 h-fit rounded-2xl border border-border bg-muted/20 p-6"
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent mb-5">
                Snapshot
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-1">Industry</dt>
                  <dd>{study.snapshot.industry}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Region</dt>
                  <dd>{study.snapshot.region}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Services</dt>
                  <dd>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {study.snapshot.services.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-xs border border-border rounded-full text-foreground/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Timeline</dt>
                  <dd>{study.snapshot.timeline}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Team</dt>
                  <dd>{study.snapshot.team}</dd>
                </div>
              </dl>
            </motion.aside>
          </div>
        </section>

        {/* Strategy */}
        <section className="px-6 py-16 md:py-24 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              {...fadeUp}
              className="font-display text-3xl md:text-4xl font-bold mb-12"
            >
              The strategy
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {study.strategy.map((step, i) => (
                <motion.div
                  key={step.heading}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-muted/10 p-6 hover:border-accent/40 transition-colors"
                >
                  <div className="font-display text-4xl font-bold text-accent/30 mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    {step.heading}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Execution */}
        <section className="px-6 py-16 md:py-24 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              {...fadeUp}
              className="font-display text-3xl md:text-4xl font-bold mb-12"
            >
              The execution
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {study.execution.map((block, i) => (
                <motion.div
                  key={block.heading}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}
                  className="rounded-2xl border border-border bg-muted/10 p-6 md:p-8 hover:border-accent/40 transition-colors"
                >
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
                    {block.heading}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {block.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        {study.gallery && study.gallery.length > 0 && (
          <section className="px-6 py-16 md:py-24 border-t border-border/50">
            <div className="max-w-6xl mx-auto space-y-12">
              <motion.h2
                {...fadeUp}
                className="font-display text-3xl md:text-4xl font-bold"
              >
                Creative gallery
              </motion.h2>
              {study.gallery.map((section, i) => (
                <motion.div key={i} {...fadeUp}>
                  <GallerySectionBlock section={section} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        <section className="px-6 py-16 md:py-24 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              {...fadeUp}
              className="font-display text-3xl md:text-4xl font-bold mb-12"
            >
              The results
            </motion.h2>
            <motion.div
              {...fadeUp}
              className="grid gap-px bg-border/50 border border-border/50 rounded-2xl overflow-hidden mb-10"
              style={{
                gridTemplateColumns: `repeat(${Math.min(
                  study.results.metrics.length,
                  5
                )}, minmax(0, 1fr))`,
              }}
            >
              {study.results.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-background p-6 md:p-8 text-center"
                >
                  <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">
                    {m.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
            {study.results.narrative && (
              <motion.p
                {...fadeUp}
                className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
              >
                {study.results.narrative}
              </motion.p>
            )}
          </div>
        </section>

        {/* Testimonial */}
        {study.testimonial && (
          <section className="px-6 py-16 md:py-24 border-t border-border/50">
            <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
              <div className="font-display text-6xl md:text-7xl text-accent/30 leading-none mb-6">
                &ldquo;
              </div>
              <blockquote className="font-display text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-balance">
                {study.testimonial.quote}
              </blockquote>
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground">
                  {study.testimonial.author}
                </span>
                {study.testimonial.role && (
                  <span> · {study.testimonial.role}</span>
                )}
              </div>
            </motion.div>
          </section>
        )}

        {/* What's next */}
        {study.nextSteps && study.nextSteps.length > 0 && (
          <section className="px-6 py-16 md:py-24 border-t border-border/50">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                {...fadeUp}
                className="font-display text-3xl md:text-4xl font-bold mb-10"
              >
                What's next
              </motion.h2>
              <ul className="space-y-4">
                {study.nextSteps.map((step, i) => (
                  <motion.li
                    key={i}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                    className="flex gap-5 items-start rounded-2xl border border-border bg-muted/10 p-5 md:p-6"
                  >
                    <span className="font-display text-xl font-bold text-accent min-w-[28px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/90 leading-relaxed pt-0.5">
                      {step}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-6 pt-16 md:pt-24">
          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-10 md:p-16 text-center glow"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-balance">
              Want results like these?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              We build creative systems that compound. Let's talk about yours.
            </p>
            <Link
              href="https://calendly.com/thewidercollective/discovery"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background rounded-full font-medium hover:scale-105 transition-transform"
            >
              Book a discovery call →
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
