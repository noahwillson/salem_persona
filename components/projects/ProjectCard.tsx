"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  slug: string;
  category?: string;
  client?: string;
  thumbnail?: { asset: { _ref: string }; alt?: string };
  index: number;
}

export default function ProjectCard({
  title,
  slug,
  category,
  client: clientName,
  thumbnail,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${slug}`}
        className="group relative block overflow-hidden bg-card border border-border aspect-[4/3]"
      >
        {thumbnail?.asset && (
          <Image
            src={urlFor(thumbnail).auto("format").quality(85).width(800).url()}
            alt={thumbnail.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-end justify-between">
            <div>
              {category && (
                <span className="text-xs uppercase tracking-[0.2em] text-accent">
                  {category}
                </span>
              )}
              <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1">
                {title}
              </h3>
              {clientName && (
                <p className="text-sm text-secondary mt-1">{clientName}</p>
              )}
            </div>
            <div className="w-10 h-10 flex items-center justify-center border border-accent rounded-full">
              <ArrowUpRight size={16} className="text-accent" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
