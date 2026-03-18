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

  /**
   * Paths disallowed in robots.txt.
   * Add paths that should not be crawled (e.g. admin, API routes).
   */
  robotsDisallow: ["/admin/", "/api/"],

  /**
   * Static pages to include in the sitemap beyond content/category pages.
   * `path` is relative to the site root; `priority` and `changeFrequency`
   * follow the sitemap protocol.
   */
  sitemapStaticPages: [
    { path: "/", priority: 1, changeFrequency: "daily" as const },
    { path: "/about", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
  ],

  /** Category page meta description template (use %s for category name) */
  categoryDescriptionTemplate: siteConfig.categoryDescriptionTemplate,
} as const;

export type SeoConfig = typeof seoConfig;
