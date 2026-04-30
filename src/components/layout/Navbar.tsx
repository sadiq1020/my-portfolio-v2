"use client";

import { personalData } from "@/data/personal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { label: "Home",          href: "#home"          },
  { label: "Tech Stack",    href: "#techstack"      },
  { label: "Qualification", href: "#qualification"  },
  { label: "Projects",      href: "#projects"       },
  { label: "Contact",       href: "#contact"        },
];

const moreLinks = [
  { label: "About Me", href: "#about"  },
  { label: "Skills",   href: "#skills" },
];

const allLinks = [...primaryLinks, ...moreLinks];

interface NavPillProps { href: string; label: string; active: boolean; }

function NavPill({ href, label, active }: NavPillProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-secondary border border-border"
          transition={{ type: "spring", stiffness: 380, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </a>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted,       setMounted]       = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [moreOpen,      setMoreOpen]      = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const ids = allLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const isActive     = (href: string) => href === `#${activeSection}`;
  const isMoreActive = moreLinks.some((l) => isActive(l.href));

  return (
    <>
      {/* Absolute Logo Header (Scrolls away) */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-40 px-6 lg:px-10 h-20"
      >
        <div className="max-w-6xl mx-auto h-full w-full flex items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center select-none" aria-label="Home">
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative h-14 w-44"
            >
              <Image
                src="/images/logo-dark.png"
                alt={personalData.name}
                fill
                priority
                className={cn("object-contain object-left transition-opacity duration-300",
                  theme === "dark" ? "opacity-100" : "opacity-0")}
                sizes="144px"
              />
              <Image
                src="/images/logo-light.png"
                alt={personalData.name}
                fill
                priority
                className={cn("object-contain object-left transition-opacity duration-300",
                  theme === "light" ? "opacity-100" : "opacity-0")}
                sizes="144px"
              />
            </motion.div>
          ) : (
            <span className="text-lg font-bold tracking-tight text-foreground h-9 flex items-center">SIM</span>
          )}
        </a>
        </div>
      </motion.div>

      {/* Fixed Sticky Header (Nav Pill & Controls) */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 h-20 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto h-full w-full flex items-center justify-end relative">
          
          {/* Center pill nav */}
          <nav className={cn(
            "pointer-events-auto hidden md:flex items-center gap-0.5 rounded-full px-2 py-1.5 transition-all duration-500",
            "md:absolute md:left-1/2 md:-translate-x-1/2",
            scrolled ? "border border-border bg-card/70 backdrop-blur-xl shadow-lg shadow-black/10 mt-2"
                     : "border border-transparent bg-transparent mt-0"
          )}>
          {primaryLinks.map((link) => (
            <NavPill key={link.href} href={link.href} label={link.label} active={isActive(link.href)} />
          ))}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((p) => !p)}
              className={cn(
                "relative flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                isMoreActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isMoreActive && (
                <motion.span layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-secondary border border-border"
                  transition={{ type: "spring", stiffness: 380, damping: 35 }}
                />
              )}
              <span className="relative z-10">More</span>
              <motion.span className="relative z-10 mt-px" animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                <ChevronDown size={13} strokeWidth={2.5} />
              </motion.span>
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full mt-3 right-0 min-w-[168px] rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-1.5 shadow-2xl shadow-black/20"
                >
                  {moreLinks.map((item) => (
                    <a key={item.href} href={item.href} onClick={() => setMoreOpen(false)}
                      className={cn("flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm transition-colors",
                        isActive(item.href) ? "bg-secondary text-foreground font-medium"
                                            : "text-muted-foreground hover:bg-secondary hover:text-foreground")}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors",
                        isActive(item.href) ? "bg-primary" : "bg-border")} />
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
          {mounted && (
            <motion.button whileTap={{ scale: 0.88 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="h-9 w-9 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                <motion.span key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  {theme === "dark" ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
          <motion.button whileTap={{ scale: 0.88 }}
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle mobile menu"
            className="md:hidden h-9 w-9 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              <motion.span key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {mobileOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/25 md:hidden overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-1">
                {allLinks.map((link, i) => (
                  <motion.a key={link.href} href={link.href}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    onClick={() => setMobileOpen(false)}
                    className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive(link.href) ? "bg-secondary text-foreground"
                                          : "text-muted-foreground hover:bg-secondary hover:text-foreground")}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0 transition-colors",
                      isActive(link.href) ? "bg-primary" : "bg-border")} />
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span layoutId="mobile-indicator" className="ml-auto h-1 w-4 rounded-full bg-primary/60" />
                    )}
                  </motion.a>
                ))}
              </div>
              <div className="border-t border-border px-5 py-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{personalData.name}</span>
                <span className="text-xs text-primary font-medium">{personalData.designation}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}