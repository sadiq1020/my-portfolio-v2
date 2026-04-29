import Link from "next/link";
import { personalData } from "@/data/personal";
import SocialLinks from "@/components/common/SocialLinks";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="#home" className="text-xl font-bold tracking-tight">
            {personalData.name.split(" ")[0]}
            <span className="text-primary">.</span>
          </Link>

          {/* Nav Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <SocialLinks links={personalData.socialLinks} />
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {year} {personalData.name}. Built with Next.js & ❤️
        </p>
      </div>
    </footer>
  );
}
