"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { Quote } from "lucide-react";

interface Testimonial {
  _id: string;
  clientName: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: { asset: { _ref: string } };
}

const placeholderTestimonials: Testimonial[] = [
  {
    _id: "1",
    clientName: "Ahmed Hassan",
    role: "CEO",
    company: "Gemy Burger",
    quote:
      "Mohamed delivered an exceptional brand identity that perfectly captured our restaurant's personality. His attention to detail and creative vision exceeded our expectations.",
  },
  {
    _id: "2",
    clientName: "Sara Ahmed",
    role: "Founder",
    company: "Infinity Solutions",
    quote:
      "Working with Mohamed was a seamless experience. He transformed our vague ideas into a stunning visual identity that truly represents our brand values.",
  },
  {
    _id: "3",
    clientName: "Dr. Saad",
    role: "Medical Director",
    company: "Dr. Saad Clinic",
    quote:
      "The logo and brand materials Mohamed created for our clinic are professional, clean, and trustworthy — exactly what we needed in the medical field.",
  },
];

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const items = testimonials?.length ? testimonials : placeholderTestimonials;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section className="py-24 md:py-32 px-6 bg-card/50">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading
          label="Testimonials"
          title="What Clients Say"
          className="text-center"
        />

        <div className="relative min-h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={items[current]._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Quote className="text-accent mb-6" size={32} />
              <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8 max-w-2xl">
                &ldquo;{items[current].quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {items[current].avatar?.asset && (
                  <Image
                    src={urlFor(items[current].avatar!)
                      .width(48)
                      .height(48)
                      .auto("format")
                      .url()}
                    alt={items[current].clientName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    {items[current].clientName}
                  </p>
                  <p className="text-xs text-secondary">
                    {items[current].role}
                    {items[current].company && `, ${items[current].company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-accent w-6"
                  : "bg-secondary/30 hover:bg-secondary"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
