import SectionHeading from "@/components/common/SectionHeading";
import { skills } from "@/data/skills";

// TechStack section: icon-grid of all skills (no level bars)
export default function TechStack() {
  return (
    <section id="techstack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="Tech Stack"
        subtitle="A quick look at the technologies I use."
      />

      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}
