import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { allProjectsQuery, categoriesQuery } from "@/sanity/lib/queries";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Mohamed Salem's portfolio of graphic design projects — brand Identity, logo design, packaging, and illustration work.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    sanityFetch(allProjectsQuery),
    sanityFetch(categoriesQuery),
  ]);

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="Portfolio" title="All Projects" />
        <ProjectGrid projects={projects} categories={categories} />
      </div>
    </section>
  );
}
