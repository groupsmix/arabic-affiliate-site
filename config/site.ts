/**
 * Site configuration — the single "edit this first" file for each niche.
 *
 * When launching a new affiliate site, update the values below to match
 * your niche, brand, and language. Every public-facing string on the site
 * is controlled from here.
 *
 * Examples of niches this starter supports out of the box:
 *   home organization · pets · fashion accessories · beauty tools ·
 *   small electronics · kitchen gadgets · fitness gear
 */
export const siteConfig = {
  // ── Brand & identity ──────────────────────────────────────────

  /** Display name shown in header, footer, metadata — REPLACE with your brand */
  name: "اسم الموقع",

  /** Default meta description — REPLACE with your niche pitch */
  description: "مراجعات ومقارنات وأدلة شراء موثوقة تساعدك على اختيار الأفضل",

  /** BCP-47 language tag for the <html> element */
  language: "ar",

  /** Text direction: "rtl" or "ltr" */
  direction: "rtl" as const,

  /** OpenGraph locale (e.g. "ar_SA", "en_US") */
  locale: "ar_SA",

  /** Short label for the niche this site covers — REPLACE with your niche */
  niche: "اسم التخصص",

  /** Contact email displayed on the About page — REPLACE with real email */
  contactEmail: "contact@example.com",

  // ── Affiliate & trust copy ────────────────────────────────────

  /** Affiliate disclosure shown in footer (site-wide) */
  affiliateDisclosure:
    "يحتوي هذا الموقع على روابط تسويقية. قد نحصل على عمولة عند الشراء من خلالها دون أي تكلفة إضافية عليك.",

  /** Shorter disclosure for content-page banners */
  contentDisclosure:
    "قد يحتوي هذا المحتوى على روابط تسويقية. نحصل أحياناً على عمولة بسيطة عند الشراء من خلالها — دون أي تكلفة إضافية عليك.",

  /** Price disclaimer shown next to product prices */
  priceDisclaimer: "السعر تقريبي وقد يتغير",

  /** Shipping/availability disclaimer in content pages */
  availabilityDisclaimer:
    "الأسعار المعروضة تقريبية وقد تتغير. التوفر والشحن قد يختلف حسب موقعك. يُرجى التحقق من التاجر قبل الشراء.",

  // ── CTA & product copy ────────────────────────────────────────

  /** CTA text for affiliate product buttons */
  buyButtonLabel: "عرض المنتج",

  /** Label for the "Products" sidebar/section heading */
  productsHeading: "المنتجات المقترحة",

  /** Placeholder hint for the price field in admin — REPLACE with your currency */
  pricePlaceholder: "مثال: 199 ريال",

  /** Label shown next to merchant/source name on product cards */
  merchantLabel: "المتجر",

  // ── Navigation ────────────────────────────────────────────────

  /** Navigation links rendered in the footer */
  footerLinks: [
    { label: "من نحن", href: "/about" },
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "شروط الاستخدام", href: "/terms" },
  ],

  /** Label used for the home breadcrumb / nav root */
  homeLabel: "الرئيسية",

  // ── Page copy ─────────────────────────────────────────────────

  /** Homepage main heading */
  homepageHeading: "أحدث المقالات",

  /** Homepage subtitle (shown below heading) — uses `description` by default */

  /** Related-content section heading on content pages */
  relatedContentHeading: "قد يعجبك أيضاً",

  /** Category page meta description template (%s = category name) */
  categoryDescriptionTemplate: "مقالات ومراجعات وأدلة شراء في تصنيف %s",

  // ── Empty states ──────────────────────────────────────────────

  /** Empty-state text when no articles exist */
  noArticlesText: "لا توجد مقالات منشورة حالياً.",

  /** Empty-state text when a category has no articles */
  noCategoryArticlesText: "لا توجد مقالات في هذا التصنيف بعد.",

  // ── Error / Not-Found page strings ────────────────────────────

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
