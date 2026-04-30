"use client";

import { personalData } from "@/data/personal";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ─── Typewriter hook ──────────────────────────────────────────────────────────

const ROLES = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "Node.js & Express Dev",
  "PostgreSQL Enthusiast",
  "UI/UX Craftsman",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay]   = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Social icon map ──────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
};

// ─── Floating stat card ───────────────────────────────────────────────────────

interface StatCardProps {
  value: string;
  label: string;
  icon: string;
  className?: string;
  delay?: number;
}

function StatCard({ value, label, icon, className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1,   y: 0  }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl",
        "border border-border bg-card/80 backdrop-blur-md shadow-xl",
        className
      )}
    >
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm font-bold text-foreground leading-none">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Hero component ──────────────────────────────────────────────────────

export default function Hero() {
  const role       = useTypewriter(ROLES);
  const ref        = useRef<HTMLElement>(null);
  const isInView   = useInView(ref, { once: true });
  const [imgError, setImgError] = useState(false);

  // Staggered container variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex items-center min-h-screen pt-20 pb-12 px-6 lg:px-10 overflow-hidden"
    >
      {/* ── Ambient background glows ─────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: text content ──────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-col gap-5"
        >
          {/* Greeting badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground">
              <Sparkles size={13} className="text-primary" />
              Hey there, welcome 👋
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            I&apos;m{" "}
            <span className="relative inline-block">
              <span className="text-primary">{personalData.name}</span>
              {/* Underline decoration */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary/40 origin-left"
              />
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-muted-foreground"
          >
            <span>I am a</span>
            <span className="text-foreground min-w-[220px]">
              {role}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-6 bg-primary ml-0.5 align-middle"
              />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
          >
            {personalData.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mt-1">
            {/* Resume download */}
            <motion.a
              href={personalData.resumeUrl}
              download="Sadiq_Ibn_Masud_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              <Download size={15} strokeWidth={2.5} />
              Download Resume
            </motion.a>

            {/* Hire Me */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/60 backdrop-blur-sm text-foreground font-semibold text-sm hover:bg-secondary hover:border-primary/40 transition-all"
            >
              Hire Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground mr-1">Find me on</span>
            {personalData.socialLinks.map((link, i) => {
              const Icon = iconMap[link.icon] ?? FaGithub;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Right: photo + floating cards ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-primary/25"
          />

          {/* Outer glow ring */}
          <div className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full bg-primary/8 blur-xl" />

          {/* Profile image */}
          <div className="relative w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
            {imgError ? (
              /* Fallback avatar when no photo exists yet */
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-7xl font-bold text-primary/40 select-none">
                  {personalData.name.charAt(0)}
                </span>
              </div>
            ) : (
              <Image
                src={personalData.profileImage}
                alt={personalData.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 260px, 310px"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* ── Floating stat cards ─────────────────────────────────── */}
          <StatCard
            value="2+ Years"
            label="Experience"
            icon="💼"
            className="-top-4 -left-6 sm:-left-12"
            delay={0.7}
          />
          <StatCard
            value="10+ Projects"
            label="Delivered"
            icon="🚀"
            className="-bottom-4 -left-4 sm:-left-10"
            delay={0.85}
          />
          <StatCard
            value="Full Stack"
            label="Developer"
            icon="⚡"
            className="-top-2 -right-2 sm:-right-6"
            delay={1.0}
          />
        </motion.div>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} strokeWidth={2} />
        </motion.div>
      </motion.div>
    </section>
  );
}