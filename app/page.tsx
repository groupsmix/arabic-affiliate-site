import { getHomepageData } from "@/lib/queries";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const articles = await getHomepageData();

  return (
    <Shell>
      <PageHeader title="مرحباً بالعالم" subtitle="أحدث المقالات" />

      {articles.length === 0 ? (
        <p className="text-foreground/60">لا توجد مقالات حالياً.</p>
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
