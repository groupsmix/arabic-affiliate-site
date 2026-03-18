import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedContent, getCategories } from "@/lib/queries";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    getPublishedContent(),
    getCategories(),
  ]);

  return (
    <Shell categories={categories}>
      <PageHeader
        title="أحدث المقالات"
        description={siteConfig.description}
      />
      {articles.length === 0 ? (
        <p className="text-foreground/50">{siteConfig.noArticlesText}</p>
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
