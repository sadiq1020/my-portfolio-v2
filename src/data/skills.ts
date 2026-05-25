import type { Education, Experience, Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "FaReact", level: 90, category: "Frontend" },
  { name: "Next.js", icon: "SiNextdotjs", level: 88, category: "Frontend" },
  { name: "TypeScript", icon: "SiTypescript", level: 82, category: "Frontend" },
  {
    name: "Tailwind CSS",
    icon: "SiTailwindcss",
    level: 90,
    category: "Frontend",
  },
  { name: "HTML5", icon: "FaHtml5", level: 95, category: "Frontend" },
  { name: "CSS3", icon: "FaCss3Alt", level: 92, category: "Frontend" },
  { name: "Framer Motion", icon: "FaReact", level: 75, category: "Frontend" },
  { name: "shadcn/ui", icon: "VscCode", level: 85, category: "Frontend" },

  // Backend
  { name: "Node.js", icon: "FaNodeJs", level: 78, category: "Backend" },
  { name: "Express.js", icon: "SiExpress", level: 78, category: "Backend" },
  { name: "PostgreSQL", icon: "SiPostgresql", level: 72, category: "Backend" },
  { name: "MongoDB", icon: "SiMongodb", level: 70, category: "Backend" },
  { name: "Prisma", icon: "SiPrisma", level: 75, category: "Backend" },
  { name: "REST API", icon: "FaNodeJs", level: 85, category: "Backend" },
  { name: "Zod", icon: "SiZod", level: 80, category: "Backend" },
  { name: "Stripe", icon: "SiStripe", level: 70, category: "Backend" },

  // Tools
  { name: "Git", icon: "FaGitAlt", level: 88, category: "Tools" },
  { name: "GitHub", icon: "FaGithub", level: 88, category: "Tools" },
  { name: "Figma", icon: "FaFigma", level: 70, category: "Tools" },
  { name: "Cloudinary", icon: "SiCloudinary", level: 72, category: "Tools" },
  { name: "AWS", icon: "FaAws", level: 60, category: "Tools" },
  { name: "Vercel", icon: "SiVercel", level: 85, category: "Tools" },
  { name: "VS Code", icon: "VscCode", level: 95, category: "Tools" },
  { name: "Postman", icon: "SiPostman", level: 80, category: "Tools" },
];

export const education: Education[] = [
  {
    institution: "North South University",
    degree: "Bachelor of Business Administration",
    field: "Major in Management Information System (MIS)",
    startYear: "2010",
    endYear: "2015",
    result: "",
  },
];

export const experience: Experience[] = [
  {
    company: "Tesseract Software & Technology",
    role: "Web Developer & Assistant Manager",
    startDate: "Jan 2023",
    endDate: "Dec 2025",
    description: [
      "Developed responsive, user-centric websites using React and Next.js with Tailwind CSS.",
      "Translated Figma UI/UX designs into functional web components with seamless visual transitions.",
      "Integrated and deployed scalable web solutions using AWS services (S3, Cognito, Lambda, DynamoDB, AWS Amplify).",
      "Supervised a cross-functional team of developers and designers, reporting to the CEO.",
    ],
  },
  {
    company: "Tesseract Software & Technology",
    role: "Manager (Part-time)",
    startDate: "Jan 2026",
    endDate: "Present",
    description: [
      "Contacting organizations and institutions to secure funds and partnerships for the company.",
      "Overseeing employee activities and bridging communication between the team and the CEO.",
      "Organizing meetings, preparing agendas, and following up on action items.",
      "Upskilling via Next Level Software Engineering Bootcamp (Programming Hero) for a senior tech role.",
    ],
  },
];
