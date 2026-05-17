"use client";

import { personalData } from "@/data/personal";
import { cn } from "@/lib/utils";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Code2,
  Coffee,
  MapPin,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { icon: Briefcase, value: "2+",  label: "Years Experience",   color: "from-blue-500/20 to-blue-500/5",   iconColor: "text-blue-400",   border: "border-blue-500/20"   },
  { icon: Rocket,    value: "10+", label: "Projects Delivered", color: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-400", border: "border-purple-500/20" },
  { icon: Code2,     value: "15+", label: "Technologies",       color: "from-green-500/20 to-green-500/5",  iconColor: "text-green-400",  border: "border-green-500/20"  },
  { icon: Users,     value: "3+",  label: "Happy Clients",      color: "from-orange-500/20 to-orange-500/5", iconColor: "text-orange-400", border: "border-orange-500/20" },
];

const quickFacts = [
  { icon: MapPin,    label: "Location",    value: "Dhaka, Bangladesh" },
  { icon: Calendar,  label: "Experience",  value: "2+ Years"          },
  { icon: Coffee,    label: "Focus",       value: "Full Stack Dev"    },
  { icon: Zap,       label: "Status",      value: "Available for Work" },
];

const values = [
  "Clean Architecture", "Performance First", "Great UX",
  "Scalable Systems",   "Open Source",       "Continuous Learning",
  "Test Driven",        "API Design",
];

const journey = [
  {
    year: "2021",
    title: "The Beginning",
    desc: "Discovered web development through Programming Hero — wrote my first HTML and instantly got hooked.",
  },
  {
    year: "2023",
    title: "Professional Start",
    desc: "Joined Tesseract Software & Technology as Web Developer & Assistant Manager. Shipped production apps with React, Next.js, and AWS.",
  },
  {
    year: "2024",
    title: "Going Full Stack",
    desc: "Expanded into backend — Node.js, Express, PostgreSQL, Prisma. Built FoodHub V2 with payments, auth, and real-time features.",
  },
  {
    year: "2026",
    title: "Levelling Up",
    desc: "Stepped back to part-time management at Tesseract Software & Technology to focus on Programming Hero's Next Level Bootcamp — sharpening advanced full stack and system design skills for a serious tech career.",
  },
];

// ─── Tilt card ────────────────────────────────────────────────────────────────

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 150, damping: 20 });
  const sy  = useSpring(y, { stiffness: 150, damping: 20 });
  const rx  = useTransform(sy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const ry  = useTransform(sx, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: string }) {
  const num    = parseInt(value);
  const suffix = value.replace(String(num), "");
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 15 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  if (inView) mv.set(num);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, value, label, color, iconColor, border, delay,
}: typeof stats[0] & { delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <TiltCard>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative p-5 rounded-2xl border bg-gradient-to-br overflow-hidden cursor-default",
          color, border
        )}
      >
        {/* Shine sweep on hover */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "200%", opacity: 0.15 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
        />
        <div className={cn("mb-3", iconColor)}>
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1">
          <AnimatedNumber value={value} />
        </div>
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
      </motion.div>
    </TiltCard>
  );
}

// ─── Timeline item ────────────────────────────────────────────────────────────

function TimelineItem({
  year, title, desc, index, inView,
}: { year: string; title: string; desc: string; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex gap-4 group"
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ scale: hovered ? 1.4 : 1, backgroundColor: hovered ? "hsl(var(--primary))" : "hsl(var(--border))" }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 rounded-full border-2 border-primary mt-1.5 flex-shrink-0"
        />
        {index < journey.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.4 }}
            className="w-px flex-1 bg-gradient-to-b from-border to-transparent mt-1 origin-top"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
        className="pb-8"
      >
        <span className="text-xs font-bold text-primary tracking-widest uppercase">{year}</span>
        <h4 className="text-foreground font-semibold mt-0.5 mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const paragraphs = personalData.bio
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 lg:px-10 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 text-xs text-muted-foreground mb-5"
          >
            <Sparkles size={11} className="text-primary" />
            Get to know me
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            About{" "}
            <span className="relative inline-block">
              <span className="text-primary">Me</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary/40 origin-left"
              />
            </span>
          </h2>
        </motion.div>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* ── Two columns: bio left, journey right ──────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">

          {/* Left: bio + quick facts + values */}
          <div className="flex flex-col gap-8">

            {/* Bio */}
            <div className="flex flex-col gap-4">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ delay: 0.15 + i * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-muted-foreground text-base md:text-lg leading-relaxed"
                >
                  {i === 0 ? (
                    <>
                      <span className="text-foreground font-semibold">
                        {para.split(".")[0]}.
                      </span>
                      {para.slice(para.indexOf(".") + 1)}
                    </>
                  ) : para}
                </motion.p>
              ))}
            </div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              {quickFacts.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  whileHover={{ x: 4, backgroundColor: "hsl(var(--secondary))" }}
                  className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm cursor-default transition-colors"
                >
                  <Icon size={14} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                    <p className="text-xs font-semibold text-foreground">{value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Values / tags */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-xs text-muted-foreground uppercase tracking-widest mb-3"
              >
                What I believe in
              </motion.p>
              <div className="flex flex-wrap gap-2">
                {values.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.055, type: "spring", stiffness: 260, damping: 18 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-primary/25 bg-primary/8 text-primary cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.a
                href={personalData.resumeUrl}
                download="Sadiq_Ibn_Masud_Resume.pdf"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
              >
                Download CV
                <ArrowRight size={13} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/60 text-foreground text-sm font-semibold hover:bg-secondary hover:border-primary/40 transition-all"
              >
                Let&apos;s Talk
              </motion.a>
            </motion.div>
          </div>

          {/* Right: journey timeline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xs text-muted-foreground uppercase tracking-widest mb-8"
            >
              My Journey
            </motion.p>

            <div className="flex flex-col">
              {journey.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  {...item}
                  index={i}
                  inView={isInView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom marquee strip ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm py-4"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap w-max"
          >
            {[...Array(2)].map((_, rep) => (
              <span key={rep} className="flex gap-8 items-center">
                {[
                  "React", "Next.js", "TypeScript", "Node.js",
                  "Express", "PostgreSQL", "Prisma", "Tailwind CSS",
                  "AWS", "Stripe", "Framer Motion", "Git",
                ].map((tech) => (
                  <span key={tech} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-primary/60" />
                    {tech}
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}