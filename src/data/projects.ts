import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    description:
      "A full-stack web application that allows users to manage their tasks efficiently with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/images/projects/project1.svg",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Socket.io"],
    liveUrl: "https://project-one.vercel.app",
    githubUrl: "https://github.com/yourusername/project-one",
    challenges:
      "Implementing real-time synchronization across multiple clients was the biggest challenge. I had to design a robust WebSocket architecture that handled disconnections gracefully and ensured data consistency without race conditions.",
    improvements:
      "In the future, I plan to add AI-powered task suggestions, mobile apps for iOS and Android, and more granular permission controls for team members.",
  },
  {
    slug: "project-two",
    title: "Project Two",
    description:
      "An e-commerce platform with a seamless shopping experience, featuring product filtering, a cart system, secure payments via Stripe, and an admin dashboard for inventory management.",
    image: "/images/projects/project2.svg",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Stripe"],
    liveUrl: "https://project-two.vercel.app",
    githubUrl: "https://github.com/yourusername/project-two",
    challenges:
      "Integrating Stripe webhooks for reliable payment confirmation was complex. Ensuring idempotency and handling failed payments gracefully required careful state management on both client and server.",
    improvements:
      "I want to add a recommendation engine, wishlist functionality, and a loyalty points system to improve user retention.",
  },
  {
    slug: "project-three",
    title: "Project Three",
    description:
      "A developer portfolio generator — input your data, choose a theme, and get a production-ready portfolio site generated instantly with Next.js and deployed to Vercel.",
    image: "/images/projects/project3.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel API"],
    liveUrl: "https://project-three.vercel.app",
    githubUrl: "https://github.com/yourusername/project-three",
    challenges:
      "Generating dynamic Next.js projects on the fly and deploying them via the Vercel API was uncharted territory. Handling file system operations securely in a serverless environment required creative solutions.",
    improvements:
      "Adding more themes, custom domain support, and a drag-and-drop section editor would make this a much more complete product.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
