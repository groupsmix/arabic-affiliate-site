import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import { getCategories } from "@/lib/queries";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.terms.title,
  description: siteConfig.pages.terms.description,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default async function TermsPage() {
  const categories = await getCategories();

  const jsonLdItems = [
    { name: siteConfig.homeLabel, url: "/" },
    { name: siteConfig.pages.terms.heading, url: "/terms" },
  ];

  return (
    <Shell categories={categories}>
      <JsonLdBreadcrumb items={jsonLdItems} />
      <PageHeader title={siteConfig.pages.terms.heading} />

      <div className="prose prose-lg max-w-none" dir="rtl">
        <p>
          باستخدامك لموقع <strong>{siteConfig.name}</strong> فإنك توافق على الشروط
          والأحكام التالية.
        </p>

        <h2>طبيعة المحتوى</h2>
        <p>
          المحتوى المنشور على هذا الموقع هو لأغراض إعلامية فقط ولا يُعدّ نصيحة
          مهنية أو مالية. نبذل جهدنا لتقديم معلومات دقيقة ومحدّثة، لكننا لا
          نضمن خلوّها من الأخطاء.
        </p>

        <h2>الروابط التسويقية</h2>
        <p>
          يحتوي الموقع على روابط تسويقية (أفلييت) لمنتجات وخدمات مقدّمة من
          أطراف ثالثة. عند الشراء من خلال هذه الروابط، قد نحصل على عمولة. هذا
          لا يزيد من السعر الذي تدفعه ولا يؤثر على مراجعاتنا.
        </p>

        <h2>الأسعار والتوفر</h2>
        <p>
          الأسعار المعروضة على الموقع هي أسعار إرشادية وقد تتغير في أي وقت دون
          إشعار مسبق. يُرجى التحقق من السعر النهائي على موقع التاجر قبل الشراء.
        </p>
        <p>
          توفر المنتجات وإمكانية الشحن قد تختلف حسب موقعك الجغرافي. بعض
          المنتجات قد لا تكون متاحة للشحن إلى جميع المناطق في المملكة العربية
          السعودية أو دول الخليج. يُرجى التحقق من سياسة الشحن لدى التاجر.
        </p>

        <h2>الملكية الفكرية</h2>
        <p>
          جميع المحتويات المنشورة على هذا الموقع (نصوص، صور، تصميم) محمية
          بموجب حقوق الملكية الفكرية. لا يجوز نسخها أو إعادة نشرها بدون إذن
          مسبق.
        </p>

        <h2>إخلاء المسؤولية</h2>
        <p>
          لا نتحمل أي مسؤولية عن قرارات الشراء التي تتخذها بناءً على المحتوى
          المنشور. المسؤولية النهائية تقع على المستخدم في التحقق من المنتج
          والتاجر قبل الشراء.
        </p>
        <p>
          لا نتحمل مسؤولية محتوى المواقع الخارجية التي نشير إليها. كل موقع
          خارجي يخضع لشروطه وسياساته الخاصة.
        </p>

        <h2>تعديل الشروط</h2>
        <p>
          نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على
          هذه الصفحة.
        </p>

        <p className="text-foreground/40 text-sm">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </Shell>
  );
}
