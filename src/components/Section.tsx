"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  snap?: boolean;
}

export function Section({ children, className, id, snap = true }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale and opacity effects on scroll
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ scale, opacity }}
      className={cn(
        "relative",
        snap && "snap-start snap-always",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
