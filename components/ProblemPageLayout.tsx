import type { ContentRow, Product, ContentCard } from "@/lib/queries";
import ContentBody from "./ContentBody";
import ProductCard from "./ProductCard";
import ArticleCard from "./ArticleCard";
import PageHeader from "./PageHeader";
import BestPageCTA from "./BestPageCTA";

type ProblemPageLayoutProps = {
  content: ContentRow;
  products: Product[];
  related: ContentCard[];
};

export default function ProblemPageLayout({
  content,
  products,
  related,
}: ProblemPageLayoutProps) {
  return (
    <div>
      <PageHeader title={content.title} subtitle={content.excerpt ?? undefined} />

      <ContentBody body={content.body} />

      {products.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">منتجات مقترحة</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <BestPageCTA
        href={`/ar/${content.category}`}
        label={`اطلع على أفضل المنتجات في ${content.category}`}
      />

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
