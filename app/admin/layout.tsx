import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <header className="border-b border-foreground/10 bg-background">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xl font-bold">
              لوحة التحكم
            </Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/admin" className="hover:underline">
                المحتوى
              </Link>
              <Link href="/admin/products" className="hover:underline">
                المنتجات
              </Link>
              <Link href="/admin/categories" className="hover:underline">
                التصنيفات
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="hover:underline text-foreground/50">
              الموقع
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="text-red-600 hover:underline text-sm"
              >
                خروج
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
