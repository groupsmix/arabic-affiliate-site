export const siteConfig = {
  /** Display name shown in header, footer, metadata */
  name: "موقع المحتوى",

  /** Default meta description for the site */
  description: "موقع محتوى عربي - مراجعات ومقارنات وأدلة شراء",

  /** BCP-47 language tag for the <html> element */
  language: "ar",

  /** Text direction: "rtl" or "ltr" */
  direction: "rtl" as const,

  /** OpenGraph locale (e.g. "ar_SA", "en_US") */
  locale: "ar_SA",

  /** Short label for the niche this site covers */
  niche: "محتوى عربي",

  /** Contact email displayed on the About page */
  contactEmail: "contact@example.com",

  /** Affiliate disclosure shown in content pages and footer */
  affiliateDisclosure:
    "يحتوي هذا الموقع على روابط تسويقية. قد نحصل على عمولة عند الشراء من خلالها دون أي تكلفة إضافية عليك.",

  /** Shorter disclosure for content-page banners */
  contentDisclosure:
    "يحتوي هذا المحتوى على روابط تسويقية. قد نحصل على عمولة عند الشراء من خلال هذه الروابط دون أي تكلفة إضافية عليك.",

  /** Price disclaimer shown next to product prices */
  priceDisclaimer: "السعر إرشادي وقد يتغير",

  /** Shipping/availability disclaimer in content pages */
  availabilityDisclaimer:
    "الأسعار المعروضة إرشادية وقد تتغير. التوفر والشحن قد يختلف حسب موقعك. يُرجى التحقق من التاجر قبل الشراء.",

  /** CTA text for affiliate product buttons */
  buyButtonLabel: "اشتري الآن",

  /** Navigation links rendered in the footer */
  footerLinks: [
    { label: "من نحن", href: "/about" },
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "شروط الاستخدام", href: "/terms" },
  ],

  /** Label used for the home breadcrumb / nav root */
  homeLabel: "الرئيسية",

  /** Label for the "Products" sidebar heading */
  productsHeading: "المنتجات",

  /** Empty-state text when no articles exist */
  noArticlesText: "لا توجد مقالات منشورة حالياً.",

  /** Empty-state text when a category has no articles */
  noCategoryArticlesText: "لا توجد مقالات في هذا التصنيف.",

  // ── Page-level UI strings ──────────────────────────────────

  /** Homepage main heading */
  homepageHeading: "أحدث المقالات",

  /** Related-content section heading on content pages */
  relatedContentHeading: "مقالات ذات صلة",

  /** Category page meta description template (%s = category name) */
  categoryDescriptionTemplate: "مقالات ومراجعات في تصنيف %s",

  // ── Error / Not-Found page strings ─────────────────────────

  /** 404 page message */
  notFoundMessage: "الصفحة التي تبحث عنها غير موجودة.",

  /** 404 page link text */
  notFoundLinkText: "العودة للرئيسية",

  /** Error page heading */
  errorHeading: "حدث خطأ",

  /** Error page message */
  errorMessage: "نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.",

  /** Error page retry button label */
  errorRetryLabel: "إعادة المحاولة",
} as const;

export type SiteConfig = typeof siteConfig;
