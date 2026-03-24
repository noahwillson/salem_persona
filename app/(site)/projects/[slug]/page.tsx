import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PortableText from "@/components/portable-text/PortableTextComponents";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch(
    projectSlugsQuery,
    undefined,
    [] as { slug: string }[],
  );
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch(projectBySlugQuery, { slug }, null);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: `${project.title} — ${project.category || "Design"} project by Mohamed Salem`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch(projectBySlugQuery, { slug }, null);

  if (!project) notFound();

  return (
    <article className="pt-24 pb-24">
      {/* Hero */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-card overflow-hidden">
        {project.heroImage?.asset ? (
          <Image
            src={urlFor(project.heroImage)
              .auto("format")
              .quality(90)
              .width(1920)
              .url()}
            alt={project.heroImage.alt || project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : project.thumbnail?.asset ? (
          <Image
            src={urlFor(project.thumbnail)
              .auto("format")
              .quality(90)
              .width(1920)
              .url()}
            alt={project.thumbnail.alt || project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Project Info */}
      <div className="mx-auto max-w-4xl px-6 -mt-16 relative z-10">
        <div className="mb-12">
          {project.category && (
            <span className="text-xs uppercase tracking-[0.2em] text-accent mb-3 block">
              {project.category}
            </span>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-secondary mt-4">
            {project.client && (
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-secondary/60 block mb-1">
                  Client
                </span>
                {project.client}
              </div>
            )}
            {project.year && (
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-secondary/60 block mb-1">
                  Year
                </span>
                {project.year}
              </div>
            )}
            {project.category && (
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-secondary/60 block mb-1">
                  Category
                </span>
                {project.category}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        {project.body && (
          <div className="mb-16">
            <PortableText value={project.body} />
          </div>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="space-y-6 mb-16">
            {project.gallery.map(
              (img: { asset: { _ref: string }; alt?: string }, i: number) => (
                <div
                  key={i}
                  className="overflow-hidden bg-card border border-border"
                >
                  <Image
                    src={urlFor(img)
                      .auto("format")
                      .quality(85)
                      .width(1200)
                      .url()}
                    alt={img.alt || `${project.title} gallery image ${i + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              ),
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-border pt-12 flex items-center justify-between">
          {project.previousProject ? (
            <Link
              href={`/projects/${project.previousProject.slug.current}`}
              className="group flex items-center gap-3 text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-secondary/60 block">
                  Previous
                </span>
                <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                  {project.previousProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {project.nextProject ? (
            <Link
              href={`/projects/${project.nextProject.slug.current}`}
              className="group flex items-center gap-3 text-secondary hover:text-accent transition-colors text-right"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.15em] text-secondary/60 block">
                  Next
                </span>
                <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                  {project.nextProject.title}
                </span>
              </div>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
