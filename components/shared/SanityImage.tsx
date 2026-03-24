"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";

interface SanityImageProps {
  image: {
    asset?: { _ref: string };
    alt?: string;
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function SanityImage({
  image,
  width,
  height,
  fill,
  sizes,
  className = "",
  priority = false,
}: SanityImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!image?.asset) return null;

  const imageUrl = urlFor(image).auto("format").quality(85).url();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={image.alt || ""}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${fill ? "object-cover" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
