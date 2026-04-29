import SectionHeading from "@/components/common/SectionHeading";
import { personalData } from "@/data/personal";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import SocialLinks from "@/components/common/SocialLinks";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading
        title="Contact"
        subtitle="Have a project in mind or just want to say hi? Reach out!"
      />

      <div className="flex flex-col items-center gap-6 max-w-md mx-auto text-center">
        <a
          href={`mailto:${personalData.email}`}
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Send email"
        >
          <FaEnvelope className="w-5 h-5 text-primary" />
          <span>{personalData.email}</span>
        </a>

        <a
          href={`tel:${personalData.phone}`}
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Call phone number"
        >
          <FaPhone className="w-5 h-5 text-primary" />
          <span>{personalData.phone}</span>
        </a>

        {personalData.whatsapp && (
          <a
            href={`https://wa.me/${personalData.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 text-primary" />
            <span>{personalData.whatsapp}</span>
          </a>
        )}

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-3">Find me on</p>
          <SocialLinks links={personalData.socialLinks} />
        </div>
      </div>
    </section>
  );
}
