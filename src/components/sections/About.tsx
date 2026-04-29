import SectionHeading from "@/components/common/SectionHeading";
import { personalData } from "@/data/personal";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="About Me"
        subtitle="Get to know the person behind the keyboard."
      />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {personalData.bio.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </section>
  );
}
