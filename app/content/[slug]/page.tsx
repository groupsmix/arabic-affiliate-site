import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import Breadcrumb from "@/components/Breadcrumb";
import ContentBody from "@/components/ContentBody";
import ProductCard from "@/components/ProductCard";
import JsonLdBreadcrumb from "@/components/JsonLdBreadcrumb";
import ArticleCard from "@/components/ArticleCard";
import { getContentBySlug, getCategories, getRelatedContent } from "@/lib/queries";
import { siteConfig } from "@/config/site";
import { commercialTypes, contentTypeLayouts } from "@/config/categories";

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

  const related = await getRelatedContent(content.category_id, slug);

  const breadcrumbs = [];
  if (content.category) {
    breadcrumbs.push({
      label: content.category.name,
      href: `/category/${content.category.slug}`,
    });
  }
  breadcrumbs.push({ label: content.title });

  const jsonLdItems = [{ name: siteConfig.homeLabel, url: "/" }];
  if (content.category) {
    jsonLdItems.push({
      name: content.category.name,
      url: `/category/${content.category.slug}`,
    });
  }
  jsonLdItems.push({ name: content.title, url: `/content/${slug}` });

  const hasProducts = content.products && content.products.length > 0;
  const isCommercial = commercialTypes.has(content.type);
  const layout = contentTypeLayouts[content.type] ?? "standard";
  const showProductsSidebar = hasProducts && layout === "sidebar";

  return (
    <Shell categories={categories}>
      <JsonLdBreadcrumb items={jsonLdItems} />
      <Breadcrumb items={breadcrumbs} />
      <PageHeader title={content.title} description={content.excerpt} />

      {(hasProducts || isCommercial) && (
        <div className="text-sm bg-foreground/5 rounded p-3 mb-4 space-y-1">
          <p className="text-foreground/50">
            {siteConfig.contentDisclosure}
          </p>
          <p className="text-foreground/40 text-xs">
            {siteConfig.availabilityDisclaimer}
          </p>
        </div>
      )}

      {showProductsSidebar ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContentBody html={content.body} />
          </div>
          <aside>
            <h2 className="font-semibold text-lg mb-4">{siteConfig.productsHeading}</h2>
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
              <h2 className="font-semibold text-lg mb-4">{siteConfig.productsHeading}</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {content.products!.map((product) => (
                  <ProductCard key={product.id} product={product} contentSlug={slug} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {related.length > 0 && (
        <section className="mt-12 border-t border-foreground/10 pt-8">
          <h2 className="font-semibold text-lg mb-4">{siteConfig.relatedContentHeading}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <ArticleCard key={item.id} content={item} />
            ))}
          </div>
        </section>
      )}
    </Shell>
  );
}
