import { sanityFetch } from "@/sanity/lib/client";
import {
  siteSettingsQuery,
  featuredProjectsQuery,
  featuredTestimonialsQuery,
} from "@/sanity/lib/queries";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import AboutPreview from "@/components/home/AboutPreview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CTASection from "@/components/home/CTASection";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, projects, testimonials] = await Promise.all([
    sanityFetch(siteSettingsQuery, undefined, null),
    sanityFetch(featuredProjectsQuery),
    sanityFetch(featuredTestimonialsQuery),
  ]);

  return (
    <>
      <Hero
        name={settings?.name}
        tagline={settings?.tagline}
        availabilityStatus={settings?.availabilityStatus}
      />
      <FeaturedProjects projects={projects} />
      <ServicesMarquee />
      <AboutPreview bio={settings?.bio} portrait={settings?.portrait} />
      <TestimonialsCarousel testimonials={testimonials} />
      <CTASection />
    </>
  );
}
