import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen">{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
