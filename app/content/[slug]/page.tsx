import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import Breadcrumb from "@/components/Breadcrumb";
import ContentBody from "@/components/ContentBody";
import ProductCard from "@/components/ProductCard";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import { getContentBySlug, getCategories } from "@/lib/queries";

export const revalidate = 60;

interface ContentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug(slug);
  if (!content) return {};

  return {
    title: content.title,
    description: content.excerpt || content.title,
    alternates: {
      canonical: `/content/${slug}`,
    },
    openGraph: {
      title: content.title,
      description: content.excerpt || content.title,
      type: "article",
    },
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params;
  const [content, categories] = await Promise.all([
    getContentBySlug(slug),
    getCategories(),
  ]);

  if (!content) notFound();

  const breadcrumbs = [];
  if (content.category) {
    breadcrumbs.push({
      label: content.category.name,
      href: `/category/${content.category.slug}`,
    });
  }
  breadcrumbs.push({ label: content.title });

  const jsonLdItems = [{ name: "الرئيسية", url: "/" }];
  if (content.category) {
    jsonLdItems.push({
      name: content.category.name,
      url: `/category/${content.category.slug}`,
    });
  }
  jsonLdItems.push({ name: content.title, url: `/content/${slug}` });

  const hasProducts = content.products && content.products.length > 0;
  const showProductsSidebar =
    hasProducts &&
    (content.type === "review" ||
      content.type === "comparison" ||
      content.type === "guide");

  return (
    <Shell categories={categories}>
      <JsonLdBreadcrumb items={jsonLdItems} />
      <Breadcrumb items={breadcrumbs} />
      <PageHeader title={content.title} description={content.excerpt} />

      {showProductsSidebar ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContentBody html={content.body} />
          </div>
          <aside>
            <h2 className="font-semibold text-lg mb-4">المنتجات</h2>
            <div className="space-y-4">
              {content.products!.map((product) => (
                <ProductCard key={product.id} product={product} contentSlug={slug} />
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <>
          <ContentBody html={content.body} />
          {hasProducts && (
            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-4">المنتجات</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {content.products!.map((product) => (
                  <ProductCard key={product.id} product={product} contentSlug={slug} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Shell>
  );
}
