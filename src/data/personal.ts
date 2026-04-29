import type { PersonalData } from "@/types";

export const personalData: PersonalData = {
  name: "Your Name",
  designation: "Full Stack Developer",
  tagline: "Building modern web experiences with passion & precision.",
  bio: `I'm a passionate Full Stack Developer with a love for crafting clean, performant,
and beautiful web applications. My journey into programming started when I discovered
how code can turn ideas into reality — and I've been hooked ever since.

I enjoy working across the entire stack, from designing pixel-perfect UIs to architecting
robust backend systems. Outside of coding, you'll find me playing cricket, listening to
music, or exploring the latest in tech.`,
  email: "your.email@example.com",
  phone: "+880 1XXXXXXXXX",
  whatsapp: "+880 1XXXXXXXXX",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/profile.svg",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/yourusername",
      icon: "FaGithub",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      icon: "FaLinkedin",
    },
    {
      label: "Twitter",
      href: "https://twitter.com/yourusername",
      icon: "FaTwitter",
    },
    {
      label: "Facebook",
      href: "https://facebook.com/yourusername",
      icon: "FaFacebook",
    },
  ],
};
