"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  snap?: boolean;
}

export function Section({ children, className, id, snap = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("relative", snap && "snap-start snap-always", className)}
    >
      {children}
    </motion.section>
  );
}
