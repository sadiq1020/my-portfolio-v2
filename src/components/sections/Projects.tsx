"use client";

import { projects } from "@/data/projects";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Code2, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-primary/6 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 35, -25, 0], y: [0, -25, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]"
      />
      {/* Floating code symbols */}
      {["{ }", "</>", "[ ]", "=>", "&&", "||"].map((sym, i) => (
        <motion.span
          key={i}
          className="absolute text-primary/8 font-mono font-bold select-none"
          style={{
            fontSize: [28, 20, 32, 22, 26, 18][i],
            left:  `${[8, 25, 55, 72, 85, 40][i]}%`,
            top:   `${[15, 70, 20, 65, 30, 85][i]}%`,
          }}
          animate={{ y: [0, -14, 0], rotate: [0, 5, -5, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: [5, 6, 4.5, 7, 5.5, 6.5][i], repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
        >
          {sym}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Tech tag ─────────────────────────────────────────────────────────────────

function TechTag({ tech, delay, inView }: { tech: string; delay: number; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.75 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 260, damping: 18 }}
      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-card border border-border text-muted-foreground"
    >
      {tech}
    </motion.span>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, index, inView,
}: {
  project: typeof projects[0]; index: number; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const visibleTags = project.techStack.slice(0, 4);
  const extraCount  = project.techStack.length - 4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-border bg-card/60 backdrop-blur-sm"
    >
      {/* Glow border on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl border border-primary/40 pointer-events-none z-10"
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted flex-shrink-0">
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

        {/* Quick action buttons — appear on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 flex gap-2"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink size={13} />
              </a>
              <a
                href={project.githubClientUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={13} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project number badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border">
          <Code2 size={10} className="text-primary" />
          <span className="text-[10px] font-bold text-muted-foreground">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title */}
        <motion.h3
          animate={{ color: hovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
          transition={{ duration: 0.2 }}
          className="text-lg font-bold leading-snug"
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tech, i) => (
            <TechTag
              key={tech}
              tech={tech}
              delay={index * 0.1 + i * 0.05}
              inView={inView}
            />
          ))}
          {extraCount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 border border-primary/20 text-primary">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link href={`/projects/${project.slug}`}>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-border bg-card/50 hover:border-primary/40 hover:bg-primary/5 transition-colors group/btn cursor-pointer"
          >
            <span className="text-sm font-semibold text-foreground">View Details</span>
            <motion.div
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-primary"
            >
              <ArrowRight size={15} />
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-10 overflow-hidden"
    >
      <Background />

      <div className="relative z-10 max-w-6xl mx-auto">

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
            Things I&apos;ve built
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Featured{" "}
            <span className="relative inline-block">
              <span className="text-primary">Projects</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary/40 origin-left"
              />
            </span>
          </h2>

          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            A selection of real-world applications — from multi-role platforms
            with payments and auth, to marketplace apps with role-based dashboards.
          </p>
        </motion.div>

        {/* ── Project grid ─────────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* ── Bottom note ──────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground/50 mt-10"
        >
          More projects on{" "}
          <a
            href="https://github.com/sadiq1020"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors underline underline-offset-2"
          >
            GitHub
          </a>
        </motion.p>

      </div>
    </section>
  );
}