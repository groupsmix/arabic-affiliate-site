import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";
import {
  getCategoryBySlug,
  getPublishedContentByCategory,
  getCategories,
} from "@/lib/queries";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, articles, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getPublishedContentByCategory(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  return (
    <Shell categories={categories}>
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
