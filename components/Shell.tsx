import Link from "next/link";
import type { Category } from "@/lib/types";

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
            موقع المحتوى
          </Link>
          <nav className="flex gap-4 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="hover:underline"
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
        <div className="max-w-5xl mx-auto px-4">
          &copy; {new Date().getFullYear()} موقع المحتوى
        </div>
      </footer>
    </div>
  );
}
