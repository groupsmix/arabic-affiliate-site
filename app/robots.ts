import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: seoConfig.robotsDisallow as unknown as string[],
      },
    ],
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
  };
}
