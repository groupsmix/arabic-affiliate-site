import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية البيانات الشخصية",
  robots: { index: true, follow: true },
};

export default async function PrivacyPage() {
  const categories = await getCategories();

  return (
    <Shell categories={categories}>
      <PageHeader title="سياسة الخصوصية" />

      <div className="prose prose-lg max-w-none" dir="rtl">
        <p>
          نحن في <strong>موقع المحتوى</strong> نحترم خصوصيتك ونلتزم بحماية
          بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية بياناتك
          عند استخدام موقعنا.
        </p>

        <h2>البيانات التي نجمعها</h2>

        <h3>بيانات التصفح (تلقائياً)</h3>
        <p>
          نستخدم خدمة <strong>Google Analytics (GA4)</strong> لتحليل حركة
          الزوار. تجمع هذه الخدمة بيانات مثل:
        </p>
        <ul>
          <li>الصفحات التي تزورها ومدة الزيارة</li>
          <li>نوع المتصفح ونظام التشغيل</li>
          <li>الموقع الجغرافي التقريبي (على مستوى المدينة)</li>
          <li>مصدر الزيارة (محرك بحث، رابط مباشر، إلخ)</li>
        </ul>
        <p>
          هذه البيانات مجمّعة وغير شخصية ولا تُستخدم لتحديد هويتك.
        </p>

        <h3>بيانات النقر على روابط المنتجات</h3>
        <p>
          عند النقر على رابط منتج (رابط تسويقي)، نسجّل:
        </p>
        <ul>
          <li>اسم المنتج</li>
          <li>الصفحة التي نقرت منها</li>
          <li>وقت النقر</li>
        </ul>
        <p>
          يتم ذلك لقياس أداء المحتوى وتحسين تجربتك. لا نسجّل أي بيانات شخصية
          (اسمك، بريدك الإلكتروني، إلخ) عند النقر.
        </p>

        <h2>ملفات تعريف الارتباط (الكوكيز)</h2>
        <p>يستخدم الموقع ملفات تعريف الارتباط التالية:</p>
        <ul>
          <li>
            <strong>كوكيز Google Analytics:</strong> لتحليل حركة الزوار وقياس
            أداء الموقع. يمكنك تعطيلها من إعدادات متصفحك أو عبر{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              إضافة إلغاء الاشتراك في Google Analytics
            </a>
            .
          </li>
          <li>
            <strong>كوكيز وظيفية:</strong> لتشغيل الموقع بشكل صحيح (مثل
            جلسة لوحة التحكم للمشرفين).
          </li>
        </ul>

        <h2>الروابط التسويقية (الأفلييت)</h2>
        <p>
          يحتوي الموقع على روابط تسويقية لمنتجات وخدمات خارجية. عند النقر على
          هذه الروابط والشراء، قد نحصل على عمولة من التاجر. هذا لا يؤثر على
          السعر الذي تدفعه. لكل تاجر سياسة خصوصية خاصة به ننصحك بمراجعتها.
        </p>

        <h2>مشاركة البيانات</h2>
        <p>
          لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة. البيانات المجمّعة
          عبر Google Analytics تخضع لسياسة خصوصية Google.
        </p>

        <h2>حقوقك</h2>
        <p>يمكنك في أي وقت:</p>
        <ul>
          <li>تعطيل ملفات تعريف الارتباط من إعدادات متصفحك</li>
          <li>طلب معرفة البيانات التي نحتفظ بها عنك</li>
          <li>
            التواصل معنا عبر صفحة{" "}
            <a href="/about">من نحن</a> لأي استفسار حول خصوصيتك
          </li>
        </ul>

        <h2>تحديث السياسة</h2>
        <p>
          قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تغييرات على
          هذه الصفحة مع تاريخ آخر تحديث.
        </p>

        <p className="text-foreground/40 text-sm">
          آخر تحديث: {new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </Shell>
  );
}
