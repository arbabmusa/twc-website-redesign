"use client";

import { motion } from "framer-motion";

export function Reel() {
  return (
    <section className="py-32 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            64 seconds. Everything we do.
          </h2>
          <p className="text-muted-foreground text-lg">
            Brands. Films. Systems. Mess.
          </p>
        </motion.div>

        {/* Showreel Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-muted group"
        >
          <video
            className="w-full h-full object-cover"
            controls
            playsInline
            poster="/work/showreel-poster.jpg"
          >
            <source src="https://video.thewidercollective.com/TWC/showreel" type="video/mp4" />
          </video>

          {/* Border glow on hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-2xl transition-all duration-500 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
