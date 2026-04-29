import SectionHeading from "@/components/common/SectionHeading";
import { personalData } from "@/data/personal";
import { education, experience } from "@/data/skills";

export default function Qualification() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="Qualification"
        subtitle="My educational background and professional experience."
      />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <h3 className="text-xl font-semibold mb-6">🎓 Education</h3>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={i}
                className="relative pl-6 border-l-2 border-border"
              >
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <p className="text-sm text-muted-foreground">{edu.startYear} – {edu.endYear}</p>
                <h4 className="font-semibold mt-1">{edu.degree} in {edu.field}</h4>
                <p className="text-muted-foreground">{edu.institution}</p>
                {edu.result && <p className="text-sm text-primary mt-1">{edu.result}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-xl font-semibold mb-6">💼 Experience</h3>
          {experience.length > 0 ? (
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l-2 border-border"
                >
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <p className="text-sm text-muted-foreground">{exp.startDate} – {exp.endDate}</p>
                  <h4 className="font-semibold mt-1">{exp.role}</h4>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                    {exp.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No experience listed yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
