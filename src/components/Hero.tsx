"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GridBackground } from "./GridBackground";

const words = ["FILM.", "BRAND.", "SYSTEMS."];

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Interactive grid background */}
      <GridBackground />
      
      {/* Background gradient blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-accent/20 via-accent-dark/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl text-center">
        {/* Main headline */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-8">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="block hover:text-accent transition-colors duration-300 cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          For businesses that hate blending in.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-medium border-2 border-accent rounded-full hover:bg-accent hover:text-background transition-all duration-300 glow-hover"
          >
            See the work
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
