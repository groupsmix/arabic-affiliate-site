import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرّف على موقع المحتوى وكيفية التواصل معنا",
  robots: { index: true, follow: true },
};

export default async function AboutPage() {
  const categories = await getCategories();

  return (
    <Shell categories={categories}>
      <PageHeader title="من نحن" />

      <div className="prose prose-lg max-w-none" dir="rtl">
        <p>
          <strong>موقع المحتوى</strong> هو موقع عربي متخصص في تقديم مراجعات
          صادقة ومقارنات موضوعية وأدلة شراء شاملة لمساعدتك في اتخاذ قرارات
          شراء مدروسة.
        </p>

        <h2>رسالتنا</h2>
        <p>
          نسعى لتوفير محتوى عربي عالي الجودة يساعد المستخدم العربي في اختيار
          المنتجات والخدمات المناسبة له، من خلال مراجعات مبنية على البحث
          والتجربة.
        </p>

        <h2>كيف نعمل</h2>
        <p>
          نقوم بمراجعة المنتجات والخدمات ومقارنتها بشكل مستقل. قد نحصل على
          عمولة عند الشراء من خلال الروابط التسويقية الموجودة في موقعنا، لكن هذا
          لا يؤثر على تقييماتنا أو توصياتنا. الأسعار التي تدفعها تبقى نفسها
          سواء استخدمت روابطنا أم لا.
        </p>

        <h2>التواصل معنا</h2>
        <p>
          نرحب بملاحظاتك واستفساراتك. يمكنك التواصل معنا عبر البريد
          الإلكتروني:
        </p>
        <p>
          <a href="mailto:contact@example.com" dir="ltr">
            contact@example.com
          </a>
        </p>
        <p className="text-foreground/40 text-sm">
          (يرجى تحديث عنوان البريد الإلكتروني بعنوانك الفعلي)
        </p>
      </div>
    </Shell>
  );
}
