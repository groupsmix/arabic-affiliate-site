import { siteConfig } from "./site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

/**
 * Default SEO / metadata values used by the root layout and
 * as fallbacks for pages that don't provide their own metadata.
 */
export const seoConfig = {
  /** Used as `metadataBase` in Next.js Metadata */
  siteUrl,

  /** Default <title> and template */
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  /** Default meta description */
  description: siteConfig.description,

  /** OpenGraph defaults */
  openGraph: {
    type: "website" as const,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },

  /** Robots defaults */
  robots: {
    index: true,
    follow: true,
  },

  /** Category page meta description template (use %s for category name) */
  categoryDescriptionTemplate: "مقالات ومراجعات في تصنيف %s",
} as const;

export type SeoConfig = typeof seoConfig;
