import type { Metadata } from "next";
import { Libre_Franklin, Source_Sans_3, Marck_Script } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const marckScript = Marck_Script({
  variable: "--font-marck-script",
  subsets: ["latin"],
  weight: "400",
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
      className={`${libreFranklin.variable} ${sourceSans.variable} ${marckScript.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased grain">
        {children}
      </body>
    </html>
  );
}
