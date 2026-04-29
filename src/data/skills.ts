import type { Skill, Education, Experience } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "FaReact", level: 90, category: "Frontend" },
  { name: "Next.js", icon: "SiNextdotjs", level: 85, category: "Frontend" },
  { name: "TypeScript", icon: "SiTypescript", level: 80, category: "Frontend" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", level: 88, category: "Frontend" },
  { name: "HTML5", icon: "FaHtml5", level: 95, category: "Frontend" },
  { name: "CSS3", icon: "FaCss3Alt", level: 90, category: "Frontend" },

  // Backend
  { name: "Node.js", icon: "FaNodeJs", level: 75, category: "Backend" },
  { name: "Express.js", icon: "SiExpress", level: 72, category: "Backend" },
  { name: "MongoDB", icon: "SiMongodb", level: 70, category: "Backend" },
  { name: "PostgreSQL", icon: "SiPostgresql", level: 65, category: "Backend" },

  // Tools
  { name: "Git", icon: "FaGitAlt", level: 85, category: "Tools" },
  { name: "VS Code", icon: "VscCode", level: 95, category: "Tools" },
  { name: "Figma", icon: "FaFigma", level: 70, category: "Tools" },
  { name: "Docker", icon: "FaDocker", level: 55, category: "Tools" },
];

export const education: Education[] = [
  {
    institution: "Your University Name",
    degree: "Bachelor of Science",
    field: "Computer Science & Engineering",
    startYear: "2021",
    endYear: "2025",
    result: "CGPA: 3.XX / 4.00",
  },
  {
    institution: "Your College Name",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    startYear: "2018",
    endYear: "2020",
    result: "GPA: 5.00 / 5.00",
  },
];

export const experience: Experience[] = [
  // Add your experience here. Remove this array entry if you have none.
  {
    company: "Company Name",
    role: "Junior Frontend Developer",
    startDate: "Jan 2024",
    endDate: "Present",
    description: [
      "Developed and maintained responsive web applications using React and Next.js.",
      "Collaborated with the design team to implement UI components using Tailwind CSS.",
      "Optimized application performance, reducing load time by 30%.",
    ],
  },
];
