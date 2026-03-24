"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  className = "",
}: SectionHeadingProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${className}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="block text-xs uppercase tracking-[0.3em] text-accent mb-4"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
}
