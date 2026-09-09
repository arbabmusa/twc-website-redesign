"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "work", href: "/#work" },
  { label: "services", href: "/#services" },
  { label: "insights", href: "/insights/" },
  { label: "contact", href: "/#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-sm bg-background/80"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/twc-logo-transparent-cropped.png"
            alt="The Wider Collective"
            className="h-3 md:h-4 w-auto mix-blend-difference [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.75))]"
          />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/insights/" className="md:hidden text-xs text-accent-light">Insights</Link>

        {/* CTA */}
        <Link
          href="https://calendly.com/thewidercollective/discovery"
          target="_blank"
          className="px-4 py-2 text-sm font-medium border border-accent/50 rounded-full hover:bg-accent hover:text-background transition-all duration-300 glow-hover"
        >
          Book a Call
        </Link>
      </nav>
    </motion.header>
  );
}
