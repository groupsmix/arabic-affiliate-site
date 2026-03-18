import type { MetadataRoute } from "next";
import { getPublishedContent, getCategories } from "@/lib/queries";
import { commercialTypes } from "@/config/categories";
import { seoConfig } from "@/config/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteUrl } = seoConfig;

  const [content, categories] = await Promise.all([
    getPublishedContent(),
    getCategories(),
  ]);

  const staticPages: MetadataRoute.Sitemap = seoConfig.sitemapStaticPages.map(
    (page) => ({
      url: `${siteUrl}${page.path === "/" ? "" : page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  );

  // Only include categories that have at least one published content item
  const categoriesWithContent = categories.filter((cat) =>
    content.some((item) => item.category_id === cat.id)
  );

  const categoryPages: MetadataRoute.Sitemap = categoriesWithContent.map((cat) => ({
    url: `${siteUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const contentPages: MetadataRoute.Sitemap = content.map((item) => ({
    url: `${siteUrl}/content/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: "weekly" as const,
    priority: commercialTypes.has(item.type) ? 0.9 : 0.6,
  }));

  return [...staticPages, ...categoryPages, ...contentPages];
}
