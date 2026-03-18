import type { MetadataRoute } from "next";
import { getPublishedContent, getCategories } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const [content, categories] = await Promise.all([
    getPublishedContent(),
    getCategories(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

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
    priority: item.type === "article" ? 0.6 : 0.9,
  }));

  return [...staticPages, ...categoryPages, ...contentPages];
}
