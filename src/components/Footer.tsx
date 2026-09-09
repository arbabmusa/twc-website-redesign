"use client";

import Link from "next/link";

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/the-wider-collective/" },
  { name: "Instagram", href: "https://www.instagram.com/thewidercollective/" },
  { name: "X", href: "https://x.com/widercollective" },
];

const footerLinks = [
  { name: "Insights", href: "/insights/" },
  { name: "Press", href: "/press" },
];

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © 2026 Wider Labs LLC
        </p>

        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {link.name}
            </Link>
          ))}
          <span className="text-muted-foreground/30">·</span>
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
