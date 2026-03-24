"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        
        // Update CSS custom properties for the radial gradient
        containerRef.current.style.setProperty('--mouse-x', `${mouseRef.current.x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${mouseRef.current.y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Base grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(155, 140, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(155, 140, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow following mouse */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(155, 140, 255, 0.15), transparent 40%)`,
        }}
      />

      {/* Animated floating dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent/10" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-accent/10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-accent/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent/10" />
    </div>
  );
}
