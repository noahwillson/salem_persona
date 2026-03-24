"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  Palette,
  PenTool,
  Package,
  Brush,
  Share2,
  FileText,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  palette: <Palette size={28} />,
  "pen-tool": <PenTool size={28} />,
  package: <Package size={28} />,
  brush: <Brush size={28} />,
  share2: <Share2 size={28} />,
  "file-text": <FileText size={28} />,
};

interface Service {
  _id: string;
  title: string;
  description?: string;
  features?: string[];
  icon?: string;
  pricingLabel?: string;
}

const defaultServices: Service[] = [
  {
    _id: "1",
    title: "Brand Identity",
    description:
      "Complete brand identity systems including logos, color palettes, typography, and brand guidelines.",
    features: [
      "Logo Design",
      "Color Palette",
      "Typography System",
      "Brand Guidelines",
    ],
    icon: "palette",
    pricingLabel: "Get a Quote",
  },
  {
    _id: "2",
    title: "Logo Design",
    description:
      "Distinctive and memorable logos that capture the essence of your brand.",
    features: [
      "Concept Development",
      "Multiple Variations",
      "File Formats",
      "Usage Guide",
    ],
    icon: "pen-tool",
    pricingLabel: "Get a Quote",
  },
  {
    _id: "3",
    title: "Packaging Design",
    description:
      "Eye-catching packaging that stands out on shelves and creates a premium experience.",
    features: [
      "Structural Design",
      "Label Design",
      "Print-Ready Files",
      "Mockups",
    ],
    icon: "package",
    pricingLabel: "Get a Quote",
  },
  {
    _id: "4",
    title: "Illustration",
    description:
      "Custom illustrations for branding, editorial, and digital applications.",
    features: [
      "Custom Artwork",
      "Character Design",
      "Pattern Design",
      "Vector Illustrations",
    ],
    icon: "brush",
    pricingLabel: "Get a Quote",
  },
  {
    _id: "5",
    title: "Social Media Design",
    description:
      "Engaging visual content for social media platforms that drives engagement.",
    features: [
      "Post Templates",
      "Story Templates",
      "Profile Branding",
      "Content Calendar",
    ],
    icon: "share2",
    pricingLabel: "Get a Quote",
  },
  {
    _id: "6",
    title: "Print Design",
    description:
      "Professional print materials including business cards, brochures, and marketing collateral.",
    features: ["Business Cards", "Brochures", "Flyers & Posters", "Stationery"],
    icon: "file-text",
    pricingLabel: "Get a Quote",
  },
];

export default function ServicesList({ services }: { services: Service[] }) {
  const items = services?.length ? services : defaultServices;
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((service, i) => (
        <motion.div
          key={service._id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group p-8 bg-card border border-border hover:border-accent/30 transition-all duration-500"
        >
          <div className="text-accent mb-6">
            {service.icon && iconMap[service.icon] ? (
              iconMap[service.icon]
            ) : (
              <Palette size={28} />
            )}
          </div>
          <h3 className="font-serif text-2xl text-foreground mb-3">
            {service.title}
          </h3>
          {service.description && (
            <p className="text-sm text-secondary leading-relaxed mb-6">
              {service.description}
            </p>
          )}
          {service.features && (
            <ul className="space-y-2 mb-6">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="text-sm text-secondary/80 flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          {service.pricingLabel && (
            <span className="text-xs uppercase tracking-[0.15em] text-accent">
              {service.pricingLabel}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
