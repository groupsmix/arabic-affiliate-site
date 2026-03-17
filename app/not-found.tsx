import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">الصفحة غير موجودة</p>
        <Link href="/" className="underline hover:opacity-70">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
