import type { Project } from "@/types";

export const projects: Project[] = [
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
  {
    slug:        "foodhub",
    title:       "FoodHub",
    description: "The first version of FoodHub — a meal ordering platform with three user roles (Customer, Provider, Admin). Customers browse and order meals with cash-on-delivery checkout. Providers manage menus and fulfil orders. Admins handle platform oversight including user management and categories.",
    image:       "/images/projects/project-foodhub.png",
    techStack:   [
      "Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui",
      "better-auth", "Zustand", "React Hook Form", "Zod",
      "TanStack Query", "Sonner", "Lucide React",
    ],
    liveUrl:         "https://ph-next-level-b6-a4-foodhub-fronten.vercel.app",
    githubClientUrl: "https://github.com/sadiq1020/ph_next_level_B6A4_foodhub-frontend",
    githubServerUrl: "https://github.com/sadiq1020/ph_next_level_B6A4_foodhub-backend",
    challenges:
      "Building a per-user cart persisted in localStorage with Zustand while keeping it isolated across different logged-in accounts was tricky. Route protection middleware needed to handle three distinct role-based access levels cleanly without leaking protected pages.",
    improvements:
      "Would like to add real-time order status updates via WebSockets, a meal rating system on the browse page, and migrate to a payment gateway for a complete checkout experience.",
  },
  {
    slug:        "budget-wheels",
    title:       "Budget Wheels",
    description: "A used car resale marketplace with three user roles — Buyer, Seller, and Admin — each with a dedicated dashboard. Sellers list vehicles with images uploaded via imgBB, buyers browse and purchase with Stripe payments, and admins manage platform-wide activity. Built with a custom Node.js/Express backend and MongoDB.",
    image:       "/images/projects/project-budget-wheel.png",
    techStack:   [
      "React.js", "React Router", "DaisyUI", "Tailwind CSS",
      "Node.js", "Express.js", "MongoDB", "Firebase Auth",
      "JWT", "Stripe", "imgBB",
    ],
    liveUrl:         "https://budget-wheels.web.app",
    githubClientUrl: "https://github.com/sadiq1020/budget_wheels_clients-repo",
    githubServerUrl: "https://github.com/sadiq1020/budget_wheels_server-repo",
    challenges:
      "Setting up JWT-based authentication alongside Firebase Auth required careful token management — ensuring protected API routes validated JWTs while the client stayed in sync with Firebase session state. Role-based dashboard routing also needed robust guard logic.",
    improvements:
      "Want to add a search and filter system for listings, a favourites/wishlist feature for buyers, and replace imgBB with Cloudinary for more reliable image handling and transforms.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}