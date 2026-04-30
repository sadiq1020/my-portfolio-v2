"use client";

import { education, experience } from "@/data/skills";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar, ChevronRight,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

// ─── Background ───────────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-80 h-80 rounded-full bg-primary/6 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 20, -35, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/4 blur-[90px]"
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {[15, 40, 65, 85].map((top, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.04, 0] }}
          transition={{ duration: 6, delay: i * 1.8, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
          style={{ top: `${top}%` }}
        />
      ))}
    </div>
  );
}

// ─── Column heading ───────────────────────────────────────────────────────────

function ColumnHeading({
  icon: Icon, label, count, color, inView, delay,
}: {
  icon: React.ElementType; label: string; count: number;
  color: string; inView: boolean; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 mb-7"
    >
      <div className={cn("p-2 rounded-xl border bg-card/80", color)}>
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">{label}</h3>
        <span className="text-xs text-muted-foreground">{count} {count === 1 ? "entry" : "entries"}</span>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        className="flex-1 h-px border-t border-border/50 origin-left"
      />
    </motion.div>
  );
}

// ─── Education item ───────────────────────────────────────────────────────────

function EducationItem({
  edu, index, inView,
}: {
  edu: typeof education[0]; index: number; inView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.13, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4"
    >
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          animate={{
            boxShadow: inView
              ? ["0 0 0 0px hsl(var(--primary)/0.3)", "0 0 0 5px hsl(var(--primary)/0)", "0 0 0 0px hsl(var(--primary)/0.3)"]
              : "none",
          }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.5 }}
          className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-background flex-shrink-0 mt-1.5"
        />
        {index < education.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.13, duration: 0.4 }}
            className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-1.5 origin-top min-h-[1.5rem]"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => edu.result && setExpanded((p) => !p)}
        className={cn("flex-1 pb-6", edu.result ? "cursor-pointer" : "")}
      >
        <div className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/25 hover:bg-card/70 transition-all duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <span className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider mb-1.5">
                <Calendar size={11} />
                {edu.startYear} – {edu.endYear}
              </span>
              <h4 className="font-bold text-foreground text-sm leading-snug">{edu.degree}</h4>
              <p className="text-xs text-primary/80 font-medium mt-1">{edu.field}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <MapPin size={11} className="flex-shrink-0" />
                {edu.institution}
              </div>
            </div>
            {edu.result && (
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground flex-shrink-0"
              >
                <ChevronRight size={14} />
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {expanded && edu.result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <Award size={12} className="text-primary flex-shrink-0" />
                  <span className="text-xs font-semibold text-primary">{edu.result}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Experience card ──────────────────────────────────────────────────────────

function ExperienceCard({
  exp, index, inView,
}: {
  exp: typeof experience[0]; index: number; inView: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const isActive = exp.endDate === "Present";
  const isPartTime = exp.role.toLowerCase().includes("part-time");

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4"
    >
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          animate={{
            boxShadow: isActive && inView
              ? ["0 0 0 0px hsl(var(--primary)/0.3)", "0 0 0 5px hsl(var(--primary)/0)", "0 0 0 0px hsl(var(--primary)/0.3)"]
              : "none",
          }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.7 }}
          className={cn(
            "w-3.5 h-3.5 rounded-full border-2 border-background flex-shrink-0 mt-1.5",
            isActive ? "bg-primary" : "bg-muted-foreground/60"
          )}
        />
        {index < experience.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
            className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent mt-1.5 origin-top min-h-[1rem]"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex-1 pb-5"
      >
        <div className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/25 hover:bg-card/70 transition-all duration-200">

          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
                  <Calendar size={11} />
                  {exp.startDate} – {exp.endDate}
                </span>
                {isActive && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Active
                  </span>
                )}
                {isPartTime && (
                  <span className="px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold border border-orange-500/20">
                    Part-time
                  </span>
                )}
              </div>
              <h4 className="font-bold text-foreground text-sm leading-snug">{exp.role}</h4>
              <p className="text-xs text-primary/80 font-medium mt-1">{exp.company}</p>
            </div>

            <motion.button
              onClick={() => setExpanded((p) => !p)}
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground flex-shrink-0 hover:text-foreground transition-colors mt-0.5"
            >
              <ChevronRight size={14} />
            </motion.button>
          </div>

          {/* Responsibilities */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 pt-3 border-t border-border space-y-2 overflow-hidden"
              >
                {exp.description.map((desc, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0 mt-2" />
                    {desc}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Qualification() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="qualification"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-10 overflow-hidden"
    >
      <GridBackground />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs text-muted-foreground mb-4"
          >
            <Sparkles size={10} className="text-primary" />
            My background
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            <span className="text-primary">Qualification</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            My educational journey and professional experience that shaped who I am today.
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="block mt-3 mx-auto h-0.5 w-12 rounded-full bg-primary/40 origin-center"
          />
        </motion.div>

        {/* ── Side by side columns ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* Experience — left, primary focus */}
          <div className="order-1">
            <ColumnHeading
              icon={Briefcase}
              label="Experience"
              count={experience.length}
              color="text-purple-400 border-purple-500/25"
              inView={isInView}
              delay={0.1}
            />
            {experience.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} inView={isInView} />
            ))}
          </div>

          {/* Education — right */}
          <div className="order-2">
            <ColumnHeading
              icon={GraduationCap}
              label="Education"
              count={education.length}
              color="text-blue-400 border-blue-500/25"
              inView={isInView}
              delay={0.15}
            />
            {education.map((edu, i) => (
              <EducationItem key={i} edu={edu} index={i} inView={isInView} />
            ))}

            {/* Training note — subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="ml-[calc(0.875rem+1rem)] mt-2"
            >
              <p className="text-xs text-muted-foreground/55 leading-relaxed">
                Also completed{" "}
                <span className="text-muted-foreground/80">Complete Web Development</span>{" "}
                (Level 1) &{" "}
                <span className="text-muted-foreground/80">
                  Next Level AI-Driven Software Engineering Bootcamp
                </span>{" "}
                (Level 2) by Programming Hero — covering TypeScript, Node.js,
                PostgreSQL, Prisma, Next.js, Docker &amp; AWS.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}