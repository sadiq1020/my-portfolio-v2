import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link href={`/projects/${project.slug}`} aria-label={`View details for ${project.title}`}>
          <Button className="w-full group/btn" variant="outline">
            View Details
            <FaArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
