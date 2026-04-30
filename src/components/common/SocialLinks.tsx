import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const iconMap: Record<string, React.ElementType> = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
};

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ links, className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)} role="list">
      {links.map((link) => {
        const Icon = iconMap[link.icon] ?? FaGithub;
        return (
          <li key={link.label}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-foreground",
                "hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110",
                "transition-all duration-200",
                iconClassName
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}