import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-6 px-4 mt-12">
      <div className="max-w-5xl mx-auto text-sm text-foreground/60 space-y-2">
        <p>
          إخلاء مسؤولية: قد تحتوي بعض الروابط في هذا الموقع على روابط تابعة
          (Affiliate Links). نحصل على عمولة صغيرة عند الشراء من خلالها دون أي
          تكلفة إضافية عليك.
        </p>
        <Link href="/" className="inline-block hover:opacity-70">
          الصفحة الرئيسية
        </Link>
      </div>
    </footer>
  );
}
