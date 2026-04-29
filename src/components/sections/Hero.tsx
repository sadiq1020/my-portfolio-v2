import Image from "next/image";
import Link from "next/link";
import { personalData } from "@/data/personal";
import SocialLinks from "@/components/common/SocialLinks";
import { Button } from "@/components/ui/button";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-6">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm">
            Hello, World! 👋
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            I&apos;m{" "}
            <span className="text-primary">{personalData.name}</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-muted-foreground font-medium">
            {personalData.designation}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
            {personalData.tagline}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a href={personalData.resumeUrl} download aria-label="Download resume">
              <Button id="download-resume-btn" size="lg" className="gap-2">
                <FaDownload className="w-4 h-4" />
                Download Resume
              </Button>
            </a>
            <Link href="#contact">
              <Button id="hire-me-btn" size="lg" variant="outline">
                Hire Me
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <SocialLinks links={personalData.socialLinks} className="mt-2" />
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
            <Image
              src={personalData.profileImage}
              alt={`${personalData.name} — ${personalData.designation}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 256px, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
