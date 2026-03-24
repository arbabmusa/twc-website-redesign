"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const stats = [
  { value: 3333, label: "NFTs", suffix: "" },
  { value: 500, label: "Total", prefix: "$", suffix: "K" },
  { value: 90, label: "days", suffix: "" },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Pitch() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Death Corp Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-2xl overflow-hidden mb-16 bg-muted"
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            controls
            loop
            playsInline
            preload="metadata"
            poster="/work/deathcorp-poster.jpg"
          >
            <source src="https://video.thewidercollective.com/Death%20Corp/NFT%20announcement.MOV" type="video/quicktime" />
            <source src="https://video.thewidercollective.com/Death%20Corp/NFT%20announcement.MOV" type="video/mp4" />
          </video>
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-mono text-sm mb-4 block"
          >
            THE PITCH
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            Death Corp Piggies.
            <br />
            <span className="text-muted-foreground">
              An apocalyptic pig IP on the Sui blockchain.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-lg text-muted-foreground mb-12"
          >
            <p>They came to us with a napkin sketch.</p>
            <p className="text-foreground font-medium">We built a universe.</p>
            <p>
              Story. Lore. Art direction.
              <br />
              3,333 unique NFTs.
              <br />
              Brand identity. Mint site. Video trailers.
              <br />
              Community from zero to thousands on X and Discord.
            </p>
            <p className="text-foreground">
              Primary mint: $100K raised.
              <br />
              Secondary trading: $400K+ volume.
              <br />
              <span className="text-accent font-medium">
                Total: half a million dollars in 90 days.
              </span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mb-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-accent">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/case-study/deathcorp"
              className="inline-flex items-center gap-2 text-accent hover:underline text-lg"
            >
              Full story →
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {[
              "Story",
              "Art",
              "NFTs",
              "Brand",
              "Web Dev",
              "Community",
              "$500K",
            ].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="px-3 py-1 text-sm border border-border rounded-full text-muted-foreground"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
