"use client";

import type { Project } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lightbulb, Wrench, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

// ── Fade-up helper ────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24, filter: "blur(4px)" },
  animate:    { opacity: 1, y: 0,  filter: "blur(0px)" },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
});

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="relative min-h-screen">

      {/* Background glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/6 blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">

        {/* Back */}
        <motion.div {...fadeUp(0)}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <motion.span
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft size={15} />
            </motion.span>
            Back to Projects
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          {...fadeUp(0.05)}
          className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-border mb-8 shadow-2xl shadow-black/20"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
        >
          {project.title}
        </motion.h1>

        {/* Links */}
        <motion.div {...fadeUp(0.15)} className="flex flex-wrap gap-3 mb-8">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>

          <motion.a
            href={project.githubClientUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/60 text-foreground text-sm font-semibold hover:bg-secondary hover:border-primary/30 transition-all"
          >
            <FaGithub size={14} />
            Client Repo
          </motion.a>

          {project.githubServerUrl && (
            <motion.a
              href={project.githubServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/60 text-foreground text-sm font-semibold hover:bg-secondary hover:border-primary/30 transition-all"
            >
              <FaGithub size={14} />
              Server Repo
            </motion.a>
          )}
        </motion.div>

        {/* Tech stack */}
        <motion.div {...fadeUp(0.2)} className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Wrench size={12} className="text-primary" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.04, type: "spring", stiffness: 260, damping: 18 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1 text-xs rounded-full border border-border bg-card text-muted-foreground font-medium cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10 origin-left"
        />

        {/* Overview */}
        <motion.section {...fadeUp(0.3)} className="mb-10">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
            <span className="h-5 w-1 rounded-full bg-primary" />
            Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
        </motion.section>

        {/* Challenges */}
        <motion.section {...fadeUp(0.38)} className="mb-10">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
            <Zap size={16} className="text-orange-400" />
            Challenges
          </h2>
          <div className="p-4 rounded-2xl border border-orange-500/15 bg-orange-500/5">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {project.challenges}
            </p>
          </div>
        </motion.section>

        {/* Improvements */}
        <motion.section {...fadeUp(0.46)}>
          <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
            <Lightbulb size={16} className="text-yellow-400" />
            Future Improvements
          </h2>
          <div className="p-4 rounded-2xl border border-yellow-500/15 bg-yellow-500/5">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {project.improvements}
            </p>
          </div>
        </motion.section>

        {/* Back bottom */}
        <motion.div {...fadeUp(0.54)} className="mt-14 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={13} />
            Back to all projects
          </Link>
        </motion.div>

      </div>
    </main>
  );
}