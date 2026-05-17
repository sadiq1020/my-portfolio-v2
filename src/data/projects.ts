import type { Project } from "@/types";

export const projects: Project[] = [
  // ── 1. FoodHub V2 ────────────────────────────────────────────────────────
  {
    slug:        "foodhub-v2",
    title:       "FoodHub V2",
    description: "A full-stack multi-role food delivery platform. Customers browse meals, place orders, and pay via Stripe. Providers manage their menus and incoming orders. Admins oversee the entire platform — approving providers, managing categories, and monitoring all users and orders.",
    image:       "/images/projects/project-foodhub-v2.png",
    techStack:   [
      "Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui",
      "Node.js", "Express", "PostgreSQL", "Prisma",
      "Better Auth", "Stripe", "Cloudinary", "Zod",
      "Nodemailer", "node-cron", "Vercel", "Render",
    ],
    liveUrl:         "https://foodhub-frontend-v2.vercel.app",
    githubClientUrl: "https://github.com/sadiq1020/Foodhub-Frontend-V2",
    githubServerUrl: "https://github.com/sadiq1020/Foodhub-Backend-V2",
    challenges:
      "The hardest parts were implementing reliable Stripe webhook handling with idempotency to prevent duplicate order processing, and setting up the OTP-based email verification flow with short expiry windows. Cross-domain cookie issues between Render and Vercel also required careful CORS and auth configuration.",
    improvements:
      "I plan to re-enable Google OAuth on the live version once moving off free-tier hosting, add real-time order tracking with WebSockets, and introduce a recommendation engine based on order history.",
  },

  // ── 2. HireFlow ──────────────────────────────────────────────────────────
  {
    slug:        "hireflow",
    title:       "HireFlow",
    description: "An AI-powered full-stack job board platform connecting job seekers with companies through intelligent matching and AI-assisted workflows. Seekers get personalized job recommendations and AI-generated cover letters. Companies post jobs with AI-generated descriptions and manage applications through a 5-stage pipeline. Admins oversee the entire platform.",
    image:       "/images/projects/project-hireflow.png",
    techStack:   [
      "Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui",
      "Framer Motion", "GSAP", "Lenis",
      "TanStack Query", "Zustand", "React Hook Form", "Zod",
      "Node.js", "Express", "PostgreSQL", "Prisma",
      "Better Auth", "Google Gemini 2.5 Flash", "Cloudinary",
      "Winston", "Vercel", "Render",
    ],
    liveUrl:         "https://hire-flow-frontend-five.vercel.app",
    githubClientUrl: "https://github.com/sadiq1020/HireFlow-Frontend",
    githubServerUrl: "https://github.com/sadiq1020/HireFlow-Backend",
    challenges:
      "Integrating 4 distinct AI features (chatbot, job recommendations, cover letter generator, job description generator) required careful prompt engineering to get structured JSON outputs reliably from Gemini. The save/unsave optimistic UI with TanStack Query's onMutate rollback pattern was also complex to get right without race conditions. On the backend, setting up Winston logging with rotating file transports and an in-memory TTL cache with prefix-based invalidation added significant architectural complexity.",
    improvements:
      "I plan to add real-time application status notifications via WebSockets, a resume parser that auto-fills application forms, and an analytics dashboard for seekers showing their application success rate by category and job type.",
  },

  // ── 3. KitchenClass ──────────────────────────────────────────────────────
  {
    slug:        "kitchenclass",
    title:       "KitchenClass",
    description: "A full-stack cooking course marketplace with three user roles — Student, Instructor, and Admin. Students browse, enroll in, and review expert-led culinary courses. Instructors apply for approval, publish courses with YouTube preview embeds, and track revenue and enrollments through analytics dashboards. Admins manage the platform, approve instructors, and monitor activity.",
    image:       "/images/projects/project-kitchenclass.png",
    techStack:   [
      "Next.js 15", "TypeScript", "Tailwind CSS", "shadcn/ui",
      "Framer Motion", "Recharts", "Zustand",
      "React Hook Form", "Zod", "Better Auth",
      "Node.js", "Express 5", "PostgreSQL", "Prisma 7",
      "Vercel", "Render", "Neon",
    ],
    liveUrl:         "https://kitchenclass-frontend.vercel.app",
    githubClientUrl: "https://github.com/sadiq1020/kitchenclass-frontend",
    githubServerUrl: "https://github.com/sadiq1020/kitchenclass-backend",
    challenges:
      "The instructor approval flow required careful state management — after sign-up, the frontend must explicitly call sign-in before hitting the instructor profile endpoint, since sign-up alone doesn't establish a session cookie in time. Route ordering in Express also caused issues where GET /courses/my-courses was being matched as a course ID before the fix. Setting up Google OAuth cross-domain between Vercel and Render required Better Auth's oAuthProxy plugin.",
    improvements:
      "I want to add a progress tracking system per course with lesson completion checkpoints, a certificate generation feature upon course completion, and a search and recommendation engine for suggesting courses based on enrollment history.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}