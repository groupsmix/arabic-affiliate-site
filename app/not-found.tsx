import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-foreground/60 text-lg mb-6">
          الصفحة التي تبحث عنها غير موجودة.
        </p>
        <Link
          href="/"
          className="inline-block bg-foreground text-background px-6 py-2 rounded font-medium hover:opacity-80"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
