"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category?: string;
  categorySlug?: string;
  thumbnail?: { asset: { _ref: string }; alt?: string };
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

export default function ProjectGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categorySlug === activeFilter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
            activeFilter === "all"
              ? "border-accent text-accent bg-accent/10"
              : "border-border text-secondary hover:border-accent hover:text-accent"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveFilter(cat.slug.current)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
              activeFilter === cat.slug.current
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={project.title}
                slug={project.slug.current}
                category={project.category}
                client={project.client}
                thumbnail={project.thumbnail}
                index={i}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-secondary py-20 text-lg">
          No projects found in this category.
        </p>
      )}
    </div>
  );
}
