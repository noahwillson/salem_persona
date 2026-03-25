import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  Cairo,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["700"],
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Mohamed Salem — Graphic Designer",
    template: "%s | Mohamed Salem",
  },
  description:
    "Freelance Graphic Designer specializing in Brand Identity, Logo Design, Packaging, and Illustration. Based in Giza, Egypt.",
  keywords: [
    "graphic designer",
    "freelance",
    "brand identity",
    "logo design",
    "packaging",
    "illustration",
    "Egypt",
  ],
  openGraph: {
    title: "Mohamed Salem — Graphic Designer",
    description:
      "Freelance Graphic Designer specializing in Brand Identity, Logo Design, Packaging, and Illustration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${cairo.variable} ${ibmPlexSansArabic.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased grain">
        {children}
      </body>
    </html>
  );
}
