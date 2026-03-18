import Link from "next/link";
import type { Category } from "@/lib/types";
import { siteConfig } from "@/config/site";

interface ShellProps {
  children: React.ReactNode;
  categories?: Category[];
}

export default function Shell({ children, categories = [] }: ShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-foreground/10 bg-background sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {siteConfig.name}
          </Link>
          <nav className="flex flex-wrap gap-2 sm:gap-4 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="hover:underline py-1"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {children}
      </main>

      <footer className="border-t border-foreground/10 py-6 text-center text-sm text-foreground/50">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <nav className="flex justify-center gap-4">
            {siteConfig.footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}</p>
          <p className="text-xs text-foreground/30">
            {siteConfig.affiliateDisclosure}
          </p>
        </div>
      </footer>
    </div>
  );
}
