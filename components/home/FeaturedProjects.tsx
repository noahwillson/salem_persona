"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category?: string;
  thumbnail?: { asset: { _ref: string }; alt?: string };
}

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  if (!projects?.length) {
    return (
      <section className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading label="Selected Work" title="Featured Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder cards */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`group relative overflow-hidden bg-card border border-border ${
                  i === 1 || i === 4
                    ? "md:col-span-2 aspect-[16/9]"
                    : "aspect-[4/3]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-card" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent">
                    Brand Identity
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-2">
                    Project {i}
                  </h3>
                  <p className="text-sm text-secondary mt-1">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="Selected Work" title="Featured Projects" />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
            >
              <Link
                href={`/projects/${project.slug.current}`}
                className={`group relative block overflow-hidden bg-card border border-border ${
                  i === 0 || i === 3 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                {project.thumbnail?.asset && (
                  <Image
                    src={urlFor(project.thumbnail)
                      .auto("format")
                      .quality(85)
                      .width(1200)
                      .url()}
                    alt={project.thumbnail.alt || project.title}
                    fill
                    sizes={
                      i === 0 || i === 3
                        ? "100vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex items-end justify-between">
                  <div>
                    {project.category && (
                      <span className="text-xs uppercase tracking-[0.2em] text-accent">
                        {project.category}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-2">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-sm text-secondary mt-1">
                        {project.client}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center border border-border rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-accent">
                    <ArrowUpRight size={18} className="text-accent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-accent hover:text-foreground transition-colors duration-300"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
