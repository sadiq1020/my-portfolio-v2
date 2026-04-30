"use client";

import { personalData } from "@/data/personal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Check, Copy, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ─── Typewriter ───────────────────────────────────────────────────────────────

const ROLES = [
  "Full Stack Developer",
  "React & Next.js Engineer",
  "Node.js & Express Dev",
  "PostgreSQL Enthusiast",
  "UI/UX Craftsman",
];

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length)       t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    else if (!deleting && charIdx === current.length) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)                t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    else { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Mouse parallax ───────────────────────────────────────────────────────────

function useMouseParallax(strength = 18) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set((e.clientX - window.innerWidth  / 2) * 0.015);
      y.set((e.clientY - window.innerHeight / 2) * 0.015);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return { springX, springY };
}

// ─── Social icon map ──────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  FaGithub, FaLinkedin, FaXTwitter, FaFacebook,
};

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps { value: string; label: string; icon: string; className?: string; delay?: number; }

function StatCard({ value, label, icon, className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -3 }}
      className={cn(
        "absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl cursor-default",
        "border border-border bg-card/80 backdrop-blur-md shadow-xl shadow-black/20",
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

// ─── Copy email ───────────────────────────────────────────────────────────────

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);
  return (
    <motion.button onClick={copy} whileTap={{ scale: 0.94 }} title="Copy email"
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
    >
      <AnimatePresence mode="wait">
        {copied
          ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-green-500"><Check size={12} /></motion.span>
          : <motion.span key="copy"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={12} /></motion.span>
        }
      </AnimatePresence>
      {copied ? "Copied!" : personalData.email}
    </motion.button>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────

function FloatingParticles() {
  const dots = [
    { x: 15, y: 20, size: 3, delay: 0,   dur: 4   },
    { x: 22, y: 60, size: 2, delay: 0.4, dur: 5   },
    { x: 40, y: 35, size: 4, delay: 0.8, dur: 3.5 },
    { x: 65, y: 75, size: 2, delay: 1.2, dur: 4.5 },
    { x: 78, y: 15, size: 3, delay: 0.2, dur: 3   },
    { x: 90, y: 50, size: 2, delay: 0.6, dur: 5.5 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p, i) => (
        <motion.div key={i}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const role     = useTypewriter(ROLES);
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [imgError, setImgError] = useState(false);
  const { springX, springY }   = useMouseParallax();

  const container = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };
 const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show:   {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

  return (
    <section id="home" ref={ref}
      className="relative flex items-center min-h-screen pt-32 pb-16 px-6 lg:px-10 overflow-hidden"
    >
      {/* Glows */}
      <motion.div aria-hidden style={{ x: springX, y: springY }}
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px]"
      />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[110px]" />

      <FloatingParticles />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"} className="flex flex-col gap-5">

          {/* Badge */}
          <motion.div variants={item}>
            <motion.span whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground cursor-default"
            >
              <motion.span animate={{ rotate: [0, 20, -10, 20, 0] }} transition={{ duration: 1.2, delay: 1.2, repeat: Infinity, repeatDelay: 4 }}>
                👋
              </motion.span>
              <Sparkles size={12} className="text-primary" />
              Hey there, welcome!
            </motion.span>
          </motion.div>

          {/* Name — letter by letter */}
          <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            I&apos;m{" "}
            <span className="relative inline-block">
              {personalData.name.split("").map((char, i) => (
                <motion.span key={i} className="inline-block text-primary"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.04, duration: 0.4 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary/35 origin-left"
              />
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item}
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-muted-foreground min-h-[2rem]"
          >
            <span>I&apos;m a</span>
            <span className="text-foreground">
              {role}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-6 bg-primary ml-0.5 align-middle rounded-full"
              />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={item} className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
            {personalData.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mt-1">
            <motion.a
              href={personalData.resumeUrl}
              download="Sadiq_Ibn_Masud_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
            >
              <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}>
                <Download size={15} strokeWidth={2.5} />
              </motion.span>
              Download Resume
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/60 backdrop-blur-sm text-foreground font-semibold text-sm hover:bg-secondary hover:border-primary/40 transition-all"
            >
              Hire Me ✨
            </motion.a>
          </motion.div>

          {/* Socials + copy email */}
          <motion.div variants={item} className="flex flex-col gap-3 mt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Find me on</span>
              {personalData.socialLinks.map((link, i) => {
                const Icon = iconMap[link.icon] ?? FaGithub;
                return (
                  <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
                    whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors duration-200"
                  >
                    <Icon size={15} />
                  </motion.a>
                );
              })}
            </div>
            <CopyEmail />
          </motion.div>
        </motion.div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Rings */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute w-[330px] h-[330px] sm:w-[390px] sm:h-[390px] rounded-full border border-dashed border-primary/20"
          />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[285px] h-[285px] sm:w-[345px] sm:h-[345px] rounded-full border border-dotted border-primary/10"
          />
          {/* Pulse glow */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] rounded-full bg-primary/10 blur-2xl"
          />

          {/* Photo */}
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-[265px] h-[265px] sm:w-[315px] sm:h-[315px] rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20"
          >
            {imgError ? (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-7xl font-bold text-primary/40 select-none">{personalData.name.charAt(0)}</span>
              </div>
            ) : (
              <Image src={personalData.profileImage} alt={personalData.name} fill priority
                className="object-cover object-[center_15%]" sizes="(max-width: 640px) 265px, 315px"
                onError={() => setImgError(true)}
              />
            )}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Stat cards */}
          <StatCard value="2+ Years"    label="Experience" icon="💼" className="-top-3 -left-4 sm:-left-14"  delay={0.8}  />
          <StatCard value="10+ Projects" label="Delivered"  icon="🚀" className="-bottom-3 -left-2 sm:-left-12" delay={0.95} />
          <StatCard value="Full Stack"  label="Developer"  icon="⚡" className="top-4 -right-2 sm:-right-8"  delay={1.1}  />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
          <motion.div animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 rounded-full bg-current"
          />
        </div>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={13} strokeWidth={2} />
        </motion.div>
      </motion.a>
    </section>
  );
}