"use client";

import { personalData } from "@/data/personal";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ─── Data ─────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home",          href: "#home"          },
  { label: "About",         href: "#about"         },
  { label: "Tech Stack",    href: "#techstack"      },
  { label: "Qualification", href: "#qualification"  },
  { label: "Projects",      href: "#projects"       },
  { label: "Contact",       href: "#contact"        },
];

const iconMap: Record<string, React.ElementType> = {
  FaGithub, FaLinkedin, FaXTwitter, FaFacebook,
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const { theme, systemTheme } = useTheme();
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
const resolvedTheme = theme === "system" ? systemTheme : theme;
  const year    = new Date().getFullYear();



  return (
    <footer ref={ref} className="relative border-t border-border overflow-hidden">

      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-24 rounded-full bg-primary/5 blur-2xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-12">

        {/* ── Main row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">

          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <a href="#home" aria-label="Back to top" className="block w-fit">
              {
                mounted && (
                  <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative h-10 w-36"
              >
                <Image
                  src="/images/logo-dark.png"
                  alt={personalData.name}
                  fill
                  className={cn(
                    "object-contain object-left transition-opacity duration-300",
                    resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
                  )}
                  sizes="144px"
                />
                <Image
                  src="/images/logo-light.png"
                  alt={personalData.name}
                  fill
                  className={cn(
                    "object-contain object-left transition-opacity duration-300",
                    resolvedTheme === "light" ? "opacity-100" : "opacity-0"
                  )}
                  sizes="144px"
                />
              </motion.div>
                )
              }
            </a>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              {personalData.tagline}
            </p>

            {/* Availability dot */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Quick Links
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <motion.span
                      className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0"
                    />
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social + contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Connect
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {personalData.socialLinks.map((link, i) => {
                const Icon = iconMap[link.icon] ?? FaGithub;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-colors duration-200"
                  >
                    <Icon size={14} />
                  </motion.a>
                );
              })}
            </div>

            {/* Email */}
            <motion.a
              href={`mailto:${personalData.email}`}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {personalData.email}
            </motion.a>
          </motion.div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left mb-6"
        />

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground"
        >
          <p>
            © {year}{" "}
            <span className="text-foreground font-medium">{personalData.name}</span>.
            All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Built with Next.js
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart size={11} className="text-red-400 fill-red-400" />
            </motion.span>
            & Framer Motion
          </p>
        </motion.div>

      </div>
    </footer>
  );
}