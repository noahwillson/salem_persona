"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section className="py-24 md:py-40 px-6" ref={ref}>
      <div className="mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="block text-xs uppercase tracking-[0.3em] text-accent mb-6"
        >
          Let&apos;s Create Together
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-8"
        >
          Have a project in mind?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-secondary text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-background text-sm uppercase tracking-[0.15em] font-medium hover:bg-accent/90 transition-all duration-300"
          >
            Start a Conversation
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
