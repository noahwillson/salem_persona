"use client";

import { motion } from "framer-motion";

const services = [
  "Brand Identity",
  "Logo Design",
  "Packaging Design",
  "Illustration",
  "Social Media",
  "Print Design",
  "Typography",
  "Visual Identity",
];

export default function ServicesMarquee() {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {/* Double the items for seamless loop */}
        {[...services, ...services, ...services].map((service, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-serif text-3xl md:text-5xl text-foreground/20 hover:text-accent transition-colors duration-500 cursor-default">
              {service}
            </span>
            <span className="text-accent text-2xl">&#x2022;</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
