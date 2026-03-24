"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "AirAsia",
    description: "1.1M reached. $0.06 per lead.",
    subtitle: "Pan-Asian market launch.",
    image: "https://thewidercollective.com/assets/airasia-cover-A6P9r8aC.png",
    href: "/case-study/airasia",
  },
  {
    title: "Mana Bay",
    description: "Brand and campaign creative delivery.",
    subtitle: "Hospitality story brought to life.",
    image: "/logos/mana-bay.png",
    href: "/case-study/manabay",
  },
  {
    title: "Global Mission Institute",
    description: "Full rebrand.",
    subtitle: "Hero video + brand guidelines.",
    image: "https://thewidercollective.com/assets/gmi-cover-BRC-3QQX.png",
    href: "/case-study/globalmission",
  },
  {
    title: "Yoyoso",
    description: "2.5M reach. +40% footfall.",
    subtitle: "80+ pastel creatives.",
    image: "https://thewidercollective.com/assets/yoyoso-cover-aHCgoYuI.png",
    href: "/case-study/yoyoso",
  },
];

export function Work() {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Work
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={project.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted mb-4">
                  {/* Project image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-lg transition-all duration-500 group-hover:glow" />
                </div>

                <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/80">{project.description}</p>
                <p className="text-muted-foreground text-sm">
                  {project.subtitle}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6 text-lg">
            All of these started the same way: "we need something that doesn't
            suck."
          </p>
          <Link
            href="https://shorturl.at/pNr6U"
            target="_blank"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            All work →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
