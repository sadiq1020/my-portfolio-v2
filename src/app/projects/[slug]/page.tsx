import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProjectBySlug } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Metadata } from "next";

// ── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Back button */}
      <Link href="/#projects" aria-label="Back to projects">
        <Button variant="ghost" className="mb-8 gap-2 -ml-2">
          <FaArrowLeft className="w-4 h-4" />
          Back to Projects
        </Button>
      </Link>

      {/* Project Image */}
      <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-border">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        {project.title}
      </h1>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full bg-muted border border-border font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mb-10">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          <Button id={`live-link-${project.slug}`} className="gap-2">
            <FaExternalLinkAlt className="w-4 h-4" />
            Live Demo
          </Button>
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Button id={`github-link-${project.slug}`} variant="outline" className="gap-2">
            <FaGithub className="w-4 h-4" />
            GitHub
          </Button>
        </a>
      </div>

      {/* Description */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
      </section>

      {/* Challenges */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Challenges</h2>
        <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
      </section>

      {/* Improvements */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Future Improvements</h2>
        <p className="text-muted-foreground leading-relaxed">{project.improvements}</p>
      </section>
    </main>
  );
}
