import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/shared/ContactForm";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mohamed Salem for freelance graphic design projects — brand identity, logo design, packaging, and more.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await sanityFetch(siteSettingsQuery, undefined, null);

  const availabilityLabel =
    settings?.availabilityStatus === "available"
      ? "Available for Freelance"
      : settings?.availabilityStatus === "limited"
        ? "Limited Availability"
        : "Not Available Currently";

  const availabilityColor =
    settings?.availabilityStatus === "available"
      ? "bg-green-500"
      : settings?.availabilityStatus === "limited"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="Get in Touch" title="Let's Work Together" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Info — 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${availabilityColor}`}
              />
              <span className="text-xs uppercase tracking-[0.15em] text-secondary">
                {availabilityLabel}
              </span>
            </div>

            <p className="text-secondary text-base leading-relaxed">
              I&apos;m always excited to work on new projects. Whether you need
              a complete brand identity, a logo, or any design work, feel free
              to reach out.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-secondary">
                <Mail size={18} className="text-accent" />
                <span>{settings?.email || "hello@mohamedsalem.design"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <MapPin size={18} className="text-accent" />
                <span>{settings?.location || "Giza, Egypt"}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-secondary mb-4">
                Find Me Online
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={
                    settings?.behanceUrl ||
                    "https://www.behance.net/mohamed_ac5e25"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-[0.15em] border border-border text-secondary hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Behance
                  <ArrowUpRight size={12} />
                </a>
                {settings?.socialLinks?.map(
                  (link: { platform: string; url: string }, i: number) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-4 py-2 text-xs uppercase tracking-[0.15em] border border-border text-secondary hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      {link.platform}
                      <ArrowUpRight size={12} />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Contact Form — 3 columns */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
