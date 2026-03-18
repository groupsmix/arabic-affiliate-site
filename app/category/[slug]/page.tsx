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

  return {
    title: category.name,
    description: `مقالات ومراجعات في تصنيف ${category.name}`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: category.name,
      description: `مقالات ومراجعات في تصنيف ${category.name}`,
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
    { name: "الرئيسية", url: "/" },
    { name: category.name, url: `/category/${slug}` },
  ];

  return (
    <Shell categories={categories}>
      <JsonLdBreadcrumb items={jsonLdItems} />
      <Breadcrumb items={[{ label: category.name }]} />
      <PageHeader title={category.name} />
      {articles.length === 0 ? (
        <p className="text-foreground/50">لا توجد مقالات في هذا التصنيف.</p>
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
