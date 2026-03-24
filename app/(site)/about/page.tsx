import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PortableText from "@/components/portable-text/PortableTextComponents";
import SectionHeading from "@/components/shared/SectionHeading";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Mohamed Salem — freelance graphic designer based in Giza, Egypt. Specializing in brand identity, logo design, packaging, and illustration.",
};

export const revalidate = 60;

const skills = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Figma",
  "Brand Strategy",
  "Typography",
  "Color Theory",
  "Print Design",
  "Digital Design",
  "Packaging Design",
];

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Design Awards", value: "5+" },
];

export default async function AboutPage() {
  const settings = await sanityFetch(siteSettingsQuery, undefined, null);

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="About" title="Mohamed Salem" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Portrait — 2 columns */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[3/4] bg-card border border-border overflow-hidden sticky top-32">
              {settings?.portrait?.asset ? (
                <Image
                  src={urlFor(settings.portrait)
                    .auto("format")
                    .quality(85)
                    .width(800)
                    .url()}
                  alt="Mohamed Salem"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              ) : (
                <Image
                  src="/salem.jpg"
                  alt="Mohamed Salem"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              )}
            </div>
          </div>

          {/* Text Content — 3 columns */}
          <div className="lg:col-span-3">
            {/* Bio */}
            <div className="mb-16">
              {settings?.aboutText ? (
                <PortableText value={settings.aboutText} />
              ) : (
                <div className="space-y-6">
                  <p className="text-secondary text-base md:text-lg leading-relaxed">
                    I&apos;m Mohamed Salem, a passionate freelance graphic
                    designer based in Giza, Egypt. With a deep love for visual
                    storytelling, I craft brand identities, logos, and design
                    systems that help businesses communicate their unique
                    stories.
                  </p>
                  <p className="text-secondary text-base md:text-lg leading-relaxed">
                    My approach combines strategic thinking with creative
                    execution. I believe that great design is not just about
                    aesthetics — it&apos;s about creating meaningful connections
                    between brands and their audiences.
                  </p>
                  <p className="text-secondary text-base md:text-lg leading-relaxed">
                    When I&apos;m not designing, you can find me exploring new
                    creative trends, sketching concepts, or collaborating with
                    fellow creatives to push the boundaries of visual design.
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-8 border-y border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-accent">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em] text-secondary mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-16">
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent mb-6">
                Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm text-secondary border border-border hover:border-accent hover:text-accent transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Behance link */}
            <div>
              <a
                href={
                  settings?.behanceUrl ||
                  "https://www.behance.net/mohamed_ac5e25"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent text-sm uppercase tracking-[0.15em] hover:bg-accent hover:text-background transition-all duration-300"
              >
                View Behance Profile
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
