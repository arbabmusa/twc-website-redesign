"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/10 via-transparent to-accent-dark/10 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-bold mb-8"
        >
          Got something?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          We run 4-5 projects at a time.
          <br />
          If yours is interesting, we want to hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="https://calendly.com/thewidercollective/discovery"
            target="_blank"
            className="inline-flex items-center gap-2 px-12 py-5 text-xl font-bold bg-accent text-background rounded-full hover:scale-105 transition-transform glow"
          >
            Book a call
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-muted-foreground"
        >
          or just email:{" "}
          <Link
            href="mailto:hello@thewidercollective.com"
            className="text-foreground hover:text-accent transition-colors underline"
          >
            hello@thewidercollective.com
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
