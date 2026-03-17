import type { ContentRow, Product, ContentCard } from "@/lib/queries";
import ContentBody from "./ContentBody";
import ComparisonTable from "./ComparisonTable";
import ArticleCard from "./ArticleCard";
import PageHeader from "./PageHeader";

type ComparisonPageLayoutProps = {
  content: ContentRow;
  products: Product[];
  related: ContentCard[];
};

export default function ComparisonPageLayout({
  content,
  products,
  related,
}: ComparisonPageLayoutProps) {
  return (
    <div>
      <PageHeader title={content.title} subtitle={content.excerpt ?? undefined} />

      {products.length > 0 && (
        <section className="mb-8">
          <ComparisonTable products={products} variant="full" />
        </section>
      )}

      <ContentBody body={content.body} />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">مقالات ذات صلة</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
