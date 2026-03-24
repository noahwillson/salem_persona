"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your brand, goals, target audience, and project requirements through a detailed brief and consultation.",
  },
  {
    number: "02",
    title: "Concept",
    description:
      "Based on research and insights, I develop initial creative concepts and mood boards to establish the visual direction.",
  },
  {
    number: "03",
    title: "Refinement",
    description:
      "Your feedback shapes the design. We iterate and refine until every detail aligns perfectly with your vision.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Final files are prepared in all required formats, along with guidelines to ensure consistent application of your new design.",
  },
];

export default function ProcessSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div className="mt-24" ref={ref}>
      <h3 className="text-xs uppercase tracking-[0.2em] text-accent mb-12">
        My Process
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative"
          >
            <span className="font-serif text-5xl text-accent/20 mb-4 block">
              {step.number}
            </span>
            <h4 className="font-serif text-xl text-foreground mb-3">
              {step.title}
            </h4>
            <p className="text-sm text-secondary leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
