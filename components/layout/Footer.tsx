"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

interface SocialLink {
  platform?: string;
  url?: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  behanceUrl?: string;
}

export default function Footer({ socialLinks = [], behanceUrl }: FooterProps) {
  const mappedSocialLinks = socialLinks
    .filter((link) => Boolean(link?.platform) && Boolean(link?.url))
    .map((link) => ({
      label: link.platform!.trim(),
      href: link.url!.trim(),
    }));

  const defaultBehanceUrl =
    behanceUrl?.trim() || "https://www.behance.net/mohamed_ac5e25";
  const hasBehance = mappedSocialLinks.some(
    (link) => link.label.toLowerCase() === "behance",
  );

  const finalSocialLinks = hasBehance
    ? mappedSocialLinks
    : [{ label: "Behance", href: defaultBehanceUrl }, ...mappedSocialLinks];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Mohamed Salem"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-secondary max-w-xs leading-relaxed">
              Freelance Graphic Designer specializing in Brand Identity, Logo
              Design, Packaging & Illustration.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-secondary mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-secondary mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              {finalSocialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} Mohamed Salem. All rights
            reserved.
          </p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="text-xs uppercase tracking-[0.15em] text-secondary hover:text-accent transition-colors duration-300"
          >
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
