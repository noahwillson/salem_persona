import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import SectionHeading from "@/components/shared/SectionHeading";
import ServicesList from "@/components/services/ServicesList";
import ProcessSection from "@/components/services/ProcessSection";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphic design services by Mohamed Salem — brand identity, logo design, packaging, illustration, and social media design.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await sanityFetch(servicesQuery);

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="What I Offer" title="Services" />

        <ServicesList services={services} />
        <ProcessSection />

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Ready to start your project?
          </h3>
          <p className="text-secondary mb-8 max-w-md mx-auto">
            Let&apos;s discuss your vision and create something extraordinary
            together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-background text-sm uppercase tracking-[0.15em] font-medium hover:bg-accent/90 transition-colors duration-300"
          >
            Get a Quote
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
