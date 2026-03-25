"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  name?: string;
  tagline?: string;
  availabilityStatus?: "available" | "limited" | "unavailable";
}

export default function Hero({
  name = "Mohamed Salem",
  tagline,
  availabilityStatus = "available",
}: HeroProps) {
  const availabilityLabel =
    availabilityStatus === "available"
      ? "Available for Freelance"
      : availabilityStatus === "limited"
        ? "Limited Availability"
        : "Not Available Currently";

  const availabilityColor =
    availabilityStatus === "available"
      ? "bg-green-500"
      : availabilityStatus === "limited"
        ? "bg-yellow-500"
        : "bg-red-500";

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] || "Mohamed";
  const restName = nameParts.slice(1).join(" ") || "Salem";

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-border rounded-full"
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${availabilityColor}`}
          />
          <span className="text-xs uppercase tracking-[0.2em] text-secondary">
            {availabilityLabel}
          </span>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] tracking-tight"
          >
            {firstName}
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight"
          >
            <span className="text-accent">{restName}</span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 text-lg md:text-xl text-secondary max-w-lg mx-auto leading-relaxed"
        >
          {tagline ||
            "Graphic Designer & Brand Strategist crafting visual identities that tell compelling stories."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 justify-center"
        >
          <a
            href="/projects"
            className="px-8 py-3 bg-accent text-background text-sm uppercase tracking-[0.15em] font-medium hover:bg-accent/90 transition-colors duration-300"
          >
            View Work
          </a>
          <a
            href="/contact"
            className="px-8 py-3 border border-border text-foreground text-sm uppercase tracking-[0.15em] hover:border-accent hover:text-accent transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-secondary" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
