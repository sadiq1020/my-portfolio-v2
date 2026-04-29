// ─── Project ────────────────────────────────────────────────────────────────

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string; // path relative to /public
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  challenges: string;
  improvements: string;
}

// ─── Skills ─────────────────────────────────────────────────────────────────

export type SkillCategory = "Frontend" | "Backend" | "Tools" | "Other";

export interface Skill {
  name: string;
  icon: string; // react-icons component name or image path
  level: number; // 0–100
  category: SkillCategory;
}

// ─── Education ──────────────────────────────────────────────────────────────

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string; // "Present" if ongoing
  result?: string;
}

// ─── Experience ─────────────────────────────────────────────────────────────

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string; // "Present" if ongoing
  description: string[];
}

// ─── Social Link ─────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // react-icons key, e.g. "FaGithub"
}

// ─── Personal ────────────────────────────────────────────────────────────────

export interface PersonalData {
  name: string;
  designation: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  whatsapp?: string;
  resumeUrl: string;
  profileImage: string;
  socialLinks: SocialLink[];
}
