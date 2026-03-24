"use client";

import { motion } from "framer-motion";

// Client logos - matching the provided image grid
// Row 1: Ittefaq, Bengal Meat Deli, AirAsia, Mana Bay, Adeen & Co
// Row 2: Fakir Apparels, Yoyoso, Maldivian, Bakkah Holdings, Vintage Bake Cafe
// Row 3: Let's Vibe, Sayeman Beach Resort, Tripper, Global Mission Institute, Renai
// Row 4: Este Medical Group, GenderGP
const clients = [
  { name: "Ittefaq News", logo: "https://video.thewidercollective.com/logos/ittefaq.png" },
  { name: "Bengal Meat Deli", logo: "https://video.thewidercollective.com/logos/bengal%20meat.png" },
  { name: "AirAsia", logo: "https://video.thewidercollective.com/logos/air%20asia.png" },
  { name: "Mana Bay", logo: "https://video.thewidercollective.com/logos/mana%20bay.png" },
  { name: "Adeen & Co", logo: "https://video.thewidercollective.com/logos/adeen.png" },
  { name: "Fakir Apparels", logo: "https://video.thewidercollective.com/logos/fakir.png" },
  { name: "Yoyoso", logo: "https://video.thewidercollective.com/logos/yoyoso.png" },
  { name: "Maldivian", logo: "https://video.thewidercollective.com/logos/Maldivian.png" },
  { name: "Bakkah Holdings", logo: "https://video.thewidercollective.com/logos/bakkah.png" },
  { name: "Vintage Bake Cafe", logo: "https://video.thewidercollective.com/logos/vintage.png" },
  { name: "Let's Vibe", logo: "https://video.thewidercollective.com/logos/lets%20vibe.png" },
  { name: "Sayeman Beach Resort", logo: "https://video.thewidercollective.com/logos/sayeman.png" },
  { name: "Tripper", logo: "https://video.thewidercollective.com/logos/tripper.png" },
  { name: "Global Mission Institute", logo: "https://video.thewidercollective.com/logos/global%20mission%20institute.png" },
  { name: "Renai", logo: "https://video.thewidercollective.com/logos/renai.png" },
  { name: "Este Medical Group", logo: "https://video.thewidercollective.com/logos/este.png" },
  { name: "GenderGP", logo: "https://video.thewidercollective.com/logos/gendergp.png" },
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
            className="flex-shrink-0 px-8 py-4 border border-border/50 rounded-lg hover:border-accent/50 transition-colors group flex items-center justify-center min-w-[140px] h-[80px]"
          >
            <img 
              src={client.logo} 
              alt={`${client.name} logo`}
              className="max-h-10 max-w-[100px] object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
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
