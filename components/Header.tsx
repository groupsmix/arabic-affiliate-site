import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-foreground/10 py-4 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          موقع المحتوى
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/ar/best" className="hover:opacity-70">
            الأفضل
          </Link>
          <Link href="/ar/comparison" className="hover:opacity-70">
            المقارنات
          </Link>
        </nav>
      </div>
    </header>
  );
}
