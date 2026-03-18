import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import {
  getCategoryBySlug,
  getPublishedContentByCategory,
  getCategories,
} from "@/lib/queries";
import { siteConfig } from "@/config/site";
import { getCategoryLabel, getCategoryDescription } from "@/config/categories";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const label = getCategoryLabel(category);
  const desc = getCategoryDescription(category);

  return {
    title: label,
    description: desc,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: label,
      description: desc,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, articles, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getPublishedContentByCategory(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  const jsonLdItems = [
    { name: siteConfig.homeLabel, url: "/" },
    { name: getCategoryLabel(category), url: `/category/${slug}` },
  ];

  return (
    <Shell categories={categories}>
      <JsonLdBreadcrumb items={jsonLdItems} />
      <Breadcrumb items={[{ label: getCategoryLabel(category) }]} />
      <PageHeader title={getCategoryLabel(category)} />
      {articles.length === 0 ? (
        <p className="text-foreground/50">{siteConfig.noCategoryArticlesText}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} content={article} />
          ))}
        </div>
      )}
    </Shell>
  );
}
