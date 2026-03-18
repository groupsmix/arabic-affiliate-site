import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import { getCategories } from "@/lib/queries";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.pages.about.title,
  description: siteConfig.pages.about.description,
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
};

export default async function AboutPage() {
  const categories = await getCategories();

  const jsonLdItems = [
    { name: siteConfig.homeLabel, url: "/" },
    { name: siteConfig.pages.about.heading, url: "/about" },
  ];

  return (
    <Shell categories={categories}>
      <JsonLdBreadcrumb items={jsonLdItems} />
      <PageHeader title={siteConfig.pages.about.heading} />

      <div className="prose prose-lg max-w-none" dir="rtl">
        <p>
          <strong>{siteConfig.name}</strong> هو موقع عربي متخصص في تقديم مراجعات
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
          نقوم بمراجعة المنتجات والخدمات ومقارنتها بشكل مستقل. {siteConfig.contentDisclosure}
        </p>

        <h2>التواصل معنا</h2>
        <p>
          نرحب بملاحظاتك واستفساراتك. يمكنك التواصل معنا عبر البريد
          الإلكتروني:
        </p>
        <p>
          <a href={`mailto:${siteConfig.contactEmail}`} dir="ltr">
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </Shell>
  );
}
