import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  children,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={cn("flex flex-col gap-3 mb-12", alignClass, className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
      {/* Decorative underline */}
      <span
        className={cn(
          "h-1 w-16 rounded-full bg-primary",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
      />
    </div>
  );
}
