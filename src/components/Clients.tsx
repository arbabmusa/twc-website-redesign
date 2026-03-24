"use client";

import { motion } from "framer-motion";

// Client logos - matching the provided image grid
// Row 1: Ittefaq, Bengal Meat Deli, AirAsia, Mana Bay, Adeen & Co
// Row 2: Fakir Apparels, Yoyoso, Maldivian, Bakkah Holdings, Vintage Bake Cafe
// Row 3: Let's Vibe, Sayeman Beach Resort, Tripper, Global Mission Institute, Renai
// Row 4: Este Medical Group, GenderGP
const clients = [
  { name: "AirAsia", logo: "/logos/air-asia.png" },
  { name: "Mana Bay", logo: "/logos/mana-bay.png" },
  { name: "Yoyoso", logo: "/logos/yoyoso.png" },
  { name: "Maldivian", logo: "/logos/Maldivian.png" },
  { name: "Sayeman Beach Resort", logo: "/logos/sayeman.png" },
  { name: "Global Mission Institute", logo: "/logos/global-mission-institute.png" },
  { name: "Renai", logo: "/logos/renai.png" },
  { name: "GenderGP", logo: "/logos/gendergp.png" },
  { name: "Camel", logo: "/logos/camel.png" },
  { name: "Death Corp Piggies", logo: "/logos/death-corp-piggies.png" },
];

function LogoMarquee({
  items,
  direction = "left",
}: {
  items: typeof clients;
  direction?: "left" | "right";
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-12 py-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex-shrink-0 px-10 py-5 border border-border/50 rounded-lg hover:border-accent/50 transition-colors group flex items-center justify-center min-w-[220px] h-[120px]"
          >
            <img 
              src={client.logo} 
              alt={`${client.name} logo`}
              className="max-h-20 max-w-[200px] object-contain opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Clients() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Businesses who wanted different.
        </motion.h2>
      </div>

      {/* Logo marquees */}
      <div className="space-y-4 mb-12">
        <LogoMarquee items={clients} direction="left" />
        <LogoMarquee items={clients.slice().reverse()} direction="right" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg"
        >
          Airlines. Healthcare. Retail. Web3. Hotels.
          <br />
          <span className="text-accent">Ambition{">"} Industry</span>
        </motion.p>
      </div>
    </section>
  );
}
