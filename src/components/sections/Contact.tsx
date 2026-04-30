"use client";

import { personalData } from "@/data/personal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com and create a free account
// 2. Create an Email Service (Gmail) and note the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Copy your Public Key from Account > API Keys
// 5. Replace the three constants below with your real values

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

// ─── Social icon map ──────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  FaGithub, FaLinkedin, FaXTwitter, FaFacebook,
};

// ─── Contact info cards ───────────────────────────────────────────────────────

const contactItems = [
  {
    icon:  Mail,
    label: "Email",
    value: personalData.email,
    href:  `mailto:${personalData.email}`,
    color: "text-blue-400",
    glow:  "bg-blue-500/10",
    ring:  "border-blue-500/20",
  },
  {
    icon:  Phone,
    label: "Phone",
    value: personalData.phone,
    href:  `tel:${personalData.phone}`,
    color: "text-green-400",
    glow:  "bg-green-500/10",
    ring:  "border-green-500/20",
  },
  {
    icon:  MessageCircle,
    label: "WhatsApp",
    value: personalData.whatsapp ?? personalData.phone,
    href:  `https://wa.me/${(personalData.whatsapp ?? personalData.phone).replace(/\D/g, "")}`,
    color: "text-emerald-400",
    glow:  "bg-emerald-500/10",
    ring:  "border-emerald-500/20",
  },
];

// ─── Background ───────────────────────────────────────────────────────────────

function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/6 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -25, 30, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-500/5 blur-[110px]"
      />
      {/* Animated ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-primary/8 hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-10 -translate-y-1/2 w-40 h-40 rounded-full border border-dotted border-primary/6 hidden lg:block"
      />
    </div>
  );
}

// ─── Input field ──────────────────────────────────────────────────────────────

function Field({
  label, name, type = "text", placeholder, value, onChange, required, textarea,
}: {
  label: string; name: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean; textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <motion.div
        animate={{ boxShadow: focused ? "0 0 0 2px hsl(var(--primary)/0.25)" : "0 0 0 0px transparent" }}
        transition={{ duration: 0.2 }}
        className="rounded-xl overflow-hidden"
      >
        <Tag
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          rows={textarea ? 4 : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full px-4 py-3 rounded-xl border bg-card/60 backdrop-blur-sm text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors duration-200 resize-none",
            focused ? "border-primary/50 bg-card/80" : "border-border hover:border-border/80"
          )}
        />
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>({
    name: "", email: "", subject: "", message: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const update = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      // Dynamic import so EmailJS bundle only loads when needed
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_name:    personalData.name,
        },
        EMAILJS_PUBLIC_KEY
      );

      setState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setState("idle"), 5000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6 lg:px-10 overflow-hidden"
    >
      <Background />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs text-muted-foreground mb-4"
          >
            <Sparkles size={10} className="text-primary" />
            Get in touch
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Let&apos;s{" "}
            <span className="relative inline-block">
              <span className="text-primary">Work Together</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary/40 origin-left"
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Have a project in mind, a question, or just want to say hi?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: contact info ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5">
                Contact Details
              </p>
              <div className="flex flex-col gap-3">
                {contactItems.map(({ icon: Icon, label, value, href, color, glow, ring }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label === "WhatsApp" ? "_blank" : undefined}
                    rel={label === "WhatsApp" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border bg-card/50 backdrop-blur-sm transition-colors duration-200 group",
                      "hover:bg-card/80", ring
                    )}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                      className={cn("p-2.5 rounded-xl border", glow, ring, color)}
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </motion.div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {personalData.socialLinks.map((link, i) => {
                  const Icon = iconMap[link.icon] ?? FaGithub;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-colors duration-200"
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
              className="flex items-start gap-3 p-4 rounded-2xl border border-green-500/20 bg-green-500/5"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mt-1.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-green-400 font-semibold">Available for work.</span>{" "}
                I&apos;m currently open to full-time roles, freelance projects,
                and interesting collaborations.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: contact form ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
                Send a Message
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Name" name="from_name" placeholder="Your name"
                    value={form.name} onChange={update("name")} required
                  />
                  <Field
                    label="Email" name="from_email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={update("email")} required
                  />
                </div>

                <Field
                  label="Subject" name="subject" placeholder="What's this about?"
                  value={form.subject} onChange={update("subject")} required
                />

                <Field
                  label="Message" name="message" placeholder="Tell me about your project or idea..."
                  value={form.message} onChange={update("message")} required textarea
                />

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={state === "sending"}
                  whileHover={state === "idle" ? { scale: 1.02 } : {}}
                  whileTap={state === "idle" ? { scale: 0.97 } : {}}
                  className={cn(
                    "mt-1 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                    state === "idle"   && "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
                    state === "sending" && "bg-primary/60 text-primary-foreground cursor-not-allowed",
                    state === "success" && "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default",
                    state === "error"   && "bg-red-500/20 text-red-400 border border-red-500/30 cursor-default",
                  )}
                >
                  <AnimatePresence mode="wait">
                    {state === "idle" && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send size={15} strokeWidth={2} />
                        Send Message
                      </motion.span>
                    )}
                    {state === "sending" && (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </motion.span>
                    )}
                    {state === "success" && (
                      <motion.span key="success"
                        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={15} />
                        Message Sent!
                      </motion.span>
                    )}
                    {state === "error" && (
                      <motion.span key="error"
                        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <AlertCircle size={15} />
                        Failed — try again
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-[11px] text-muted-foreground/50 text-center">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}