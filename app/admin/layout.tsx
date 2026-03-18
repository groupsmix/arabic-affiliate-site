import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, adminLabels } from "@/config/site";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" dir={siteConfig.direction}>
      <header className="border-b border-foreground/10 bg-background">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/admin" className="text-xl font-bold">
              {adminLabels.dashboard}
            </Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/admin" className="hover:underline">
                {adminLabels.content}
              </Link>
              <Link href="/admin/products" className="hover:underline">
                {adminLabels.products}
              </Link>
              <Link href="/admin/categories" className="hover:underline">
                {adminLabels.categories}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="hover:underline text-foreground/50">
              {adminLabels.viewSite}
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="text-red-600 hover:underline text-sm"
              >
                {adminLabels.logout}
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
    </div>
  );
}
