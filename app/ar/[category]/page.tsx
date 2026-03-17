import { getCategoryPage } from "@/lib/queries";
import Shell from "@/components/Shell";
import Breadcrumb from "@/components/Breadcrumb";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const articles = await getCategoryPage(category);

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: category },
  ];

  return (
    <Shell>
      <Breadcrumb crumbs={crumbs} />
      <PageHeader title={category} />

      {articles.length === 0 ? (
        <p className="text-foreground/60">لا توجد مقالات في هذا القسم.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </Shell>
  );
}
