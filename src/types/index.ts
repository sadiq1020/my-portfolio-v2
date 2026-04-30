// ─── Project ────────────────────────────────────────────────────────────────

export interface Project {
  slug:            string;
  title:           string;
  description:     string;
  image:           string;
  techStack:       string[];
  liveUrl:         string;
  githubClientUrl: string;       // frontend / client repo
  githubServerUrl?: string;      // backend / server repo (optional)
  challenges:      string;
  improvements:    string;
}

// ─── Skills ─────────────────────────────────────────────────────────────────

export type SkillCategory = "Frontend" | "Backend" | "Tools" | "Other";

export interface Skill {
  name:     string;
  icon:     string;
  level:    number;
  category: SkillCategory;
}

// ─── Education ──────────────────────────────────────────────────────────────

export interface Education {
  institution: string;
  degree:      string;
  field:       string;
  startYear:   string;
  endYear:     string;
  result?:     string;
}

// ─── Experience ─────────────────────────────────────────────────────────────

export interface Experience {
  company:     string;
  role:        string;
  startDate:   string;
  endDate:     string;
  description: string[];
}

// ─── Social Link ─────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  href:  string;
  icon:  string;
}

// ─── Personal ────────────────────────────────────────────────────────────────

export interface PersonalData {
  name:         string;
  designation:  string;
  tagline:      string;
  bio:          string;
  email:        string;
  phone:        string;
  whatsapp?:    string;
  resumeUrl:    string;
  profileImage: string;
  socialLinks:  SocialLink[];
}