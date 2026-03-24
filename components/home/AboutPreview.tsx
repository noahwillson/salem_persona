"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight } from "lucide-react";

interface AboutPreviewProps {
  bio?: string;
  portrait?: { asset: { _ref: string }; alt?: string };
}

export default function AboutPreview({ bio, portrait }: AboutPreviewProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-24 md:py-32 px-6">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative aspect-[3/4] bg-card border border-border overflow-hidden"
          >
            {portrait?.asset ? (
              <Image
                src={urlFor(portrait)
                  .auto("format")
                  .quality(85)
                  .width(800)
                  .url()}
                alt="Mohamed Salem"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
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
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block">
              About Me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Crafting Visual Stories
            </h2>
            <p className="text-secondary text-base md:text-lg leading-relaxed mb-8">
              {bio ||
                "I'm Mohamed Salem, a freelance graphic designer based in Giza, Egypt. I specialize in creating compelling brand identities, logos, and visual designs that help businesses stand out and connect with their audience."}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-accent hover:text-foreground transition-colors duration-300"
            >
              Learn More
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
