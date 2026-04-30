"use client";

import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Layers, Server, Sparkles, Wrench } from "lucide-react";
import { useRef, useState } from "react";
import {
  FaAws,
  FaCss3Alt,
  FaFigma,
  FaGitAlt, FaGithub,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiCloudinary,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt,
  FaGithub, FaFigma, FaAws, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiExpress, SiPostgresql, SiMongodb,
  SiPrisma, SiStripe, SiVercel, SiPostman, SiCloudinary,
  SiZod, VscCode,
};

// ─── Category config ──────────────────────────────────────────────────────────

const categories: {
  key:      SkillCategory;
  label:    string;
  icon:     React.ElementType;
  color:    string;
  glow:     string;
  ring:     string;
  badge:    string;
}[] = [
  { key: "Frontend", label: "Frontend",      icon: Layers, color: "text-blue-400",   glow: "bg-blue-500/10",   ring: "border-blue-500/30",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"   },
  { key: "Backend",  label: "Backend",       icon: Server, color: "text-purple-400", glow: "bg-purple-500/10", ring: "border-purple-500/30", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  { key: "Tools",    label: "Tools & DevOps", icon: Wrench, color: "text-green-400",  glow: "bg-green-500/10",  ring: "border-green-500/30",  badge: "bg-green-500/10 text-green-400 border-green-500/20"  },
];

// ─── Compact skill pill ───────────────────────────────────────────────────────

function SkillPill({
  skill, catColor, catGlow, catRing, delay, inView,
}: {
  skill:    typeof skills[0];
  catColor: string;
  catGlow:  string;
  catRing:  string;
  delay:    number;
  inView:   boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[skill.icon] ?? FaReact;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          y:     hovered ? -4 : 0,
          scale: hovered ? 1.06 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "relative flex items-center gap-2 px-3 py-2 rounded-xl border bg-card/60 backdrop-blur-sm cursor-default overflow-hidden transition-colors duration-200",
          hovered ? catRing : "border-border"
        )}
      >
        {/* Glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("absolute inset-0 pointer-events-none blur-md", catGlow)}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.span
          animate={{ rotate: hovered ? [0, -10, 10, 0] : 0, scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.35 }}
          className={cn("relative z-10 text-base flex-shrink-0 transition-colors duration-200",
            hovered ? catColor : "text-muted-foreground"
          )}
        >
          <Icon />
        </motion.span>

        {/* Name */}
        <span className="relative z-10 text-xs font-medium text-foreground whitespace-nowrap">
          {skill.name}
        </span>

        {/* Level dot */}
        <motion.span
          animate={{ scale: hovered ? 1.2 : 1 }}
          className={cn(
            "relative z-10 ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200",
            hovered ? "bg-primary" : "bg-muted-foreground/30"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative py-20 px-6 lg:px-10 overflow-hidden"
    >
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-[80px]" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs text-muted-foreground mb-4"
          >
            <Sparkles size={10} className="text-primary" />
            My arsenal
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Tech Stack{" "}
            <span className="relative inline-block">
              <span className="text-primary">&amp; Skills</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary/40 origin-left"
              />
            </span>
          </h2>

          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            {skills.length} technologies across{" "}
            {categories.map((c, i) => (
              <span key={c.key}>
                <span className={c.color}>{c.label}</span>
                {i < categories.length - 1 ? ", " : ""}
              </span>
            ))}
            — each battle-tested in real projects.
          </p>
        </motion.div>

        {/* ── Category sections ────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          {categories.map((cat, catIdx) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            const CatIcon   = cat.icon;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIdx * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <motion.div
                    animate={isInView ? { rotate: [0, 8, -4, 0] } : {}}
                    transition={{ delay: catIdx * 0.12 + 0.3, duration: 0.5 }}
                    className={cn("p-1.5 rounded-lg border bg-card/80", cat.color, cat.ring)}
                  >
                    <CatIcon size={13} strokeWidth={1.8} />
                  </motion.div>
                  <span className={cn("text-xs font-bold uppercase tracking-widest", cat.color)}>
                    {cat.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    · {catSkills.length} techs
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: catIdx * 0.12 + 0.25, duration: 0.5 }}
                    className={cn("flex-1 h-px border-t origin-left", cat.ring)}
                  />
                </div>

                {/* Pills grid */}
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill, i) => (
                    <SkillPill
                      key={skill.name}
                      skill={skill}
                      catColor={cat.color}
                      catGlow={cat.glow}
                      catRing={cat.ring}
                      delay={catIdx * 0.08 + i * 0.045}
                      inView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Proficiency legend ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 px-5 rounded-xl border border-border bg-card/30 backdrop-blur-sm"
        >
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Proficiency
          </span>
          {[
            { label: "Familiar",    range: "50–69%", opacity: "opacity-30" },
            { label: "Comfortable", range: "70–79%", opacity: "opacity-50" },
            { label: "Proficient",  range: "80–89%", opacity: "opacity-75" },
            { label: "Expert",      range: "90%+",   opacity: "opacity-100" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full bg-primary", item.opacity)} />
              <span className="text-[10px] text-muted-foreground">
                {item.label}
                <span className="text-muted-foreground/50 ml-1">{item.range}</span>
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}