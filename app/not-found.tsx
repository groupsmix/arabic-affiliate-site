import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" dir={siteConfig.direction}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-foreground/60 text-lg mb-6">
          {siteConfig.notFoundMessage}
        </p>
        <Link
          href="/"
          className="inline-block bg-foreground text-background px-6 py-2 rounded font-medium hover:opacity-80"
        >
          {siteConfig.notFoundButton}
        </Link>
      </div>
    </div>
  );
}
