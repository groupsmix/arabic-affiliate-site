import { seoConfig } from "@/config/seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function JsonLdBreadcrumb({ items }: JsonLdBreadcrumbProps) {
  const { siteUrl } = seoConfig;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
