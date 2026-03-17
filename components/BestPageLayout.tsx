import type { ContentRow, Product, ContentCard } from "@/lib/queries";
import ContentBody from "./ContentBody";
import ProductCard from "./ProductCard";
import ArticleCard from "./ArticleCard";
import PageHeader from "./PageHeader";
import ComparisonTable from "./ComparisonTable";

type BestPageLayoutProps = {
  content: ContentRow;
  products: Product[];
  related: ContentCard[];
};

export default function BestPageLayout({
  content,
  products,
  related,
}: BestPageLayoutProps) {
  return (
    <div>
      <PageHeader title={content.title} subtitle={content.excerpt ?? undefined} />

      <ContentBody body={content.body} />

      {products.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">المنتجات الموصى بها</h2>
          <ComparisonTable products={products} variant="mini" />
          <div className="grid gap-4 mt-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

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
