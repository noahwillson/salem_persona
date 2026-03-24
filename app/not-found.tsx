import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <span className="font-serif text-9xl text-accent/20">404</span>
      <h1 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-4">
        Page Not Found
      </h1>
      <p className="text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3 border border-accent text-accent text-sm uppercase tracking-[0.15em] hover:bg-accent hover:text-background transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
