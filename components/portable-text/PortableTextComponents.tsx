import { PortableText as PortableTextComponent } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).auto("format").quality(85).url()}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-10 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-secondary text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-accent pl-6 my-8 italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-4 hover:text-foreground transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 text-secondary mb-6 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 text-secondary mb-6 ml-4">
        {children}
      </ol>
    ),
  },
};

export default function PortableText({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <PortableTextComponent value={value} components={components as any} />
  );
}
