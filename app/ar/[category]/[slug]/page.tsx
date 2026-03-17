import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getLinkedProducts,
  getRelatedArticles,
} from "@/lib/queries";
import Shell from "@/components/Shell";
import Breadcrumb from "@/components/Breadcrumb";
import BestPageLayout from "@/components/BestPageLayout";
import ProblemPageLayout from "@/components/ProblemPageLayout";
import ComparisonPageLayout from "@/components/ComparisonPageLayout";

export const dynamic = "force-dynamic";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const content = await getContentBySlug(slug);

  if (!content || content.category !== category) {
    notFound();
  }

  const [products, related] = await Promise.all([
    getLinkedProducts(content.id),
    getRelatedArticles(content.category, content.slug),
  ]);

  const crumbs = [
    { label: "الرئيسية", href: "/" },
    { label: content.category, href: `/ar/${content.category}` },
    { label: content.title },
  ];

  const layoutProps = { content, products, related };

  return (
    <Shell>
      <Breadcrumb crumbs={crumbs} />
      {content.type === "best" && <BestPageLayout {...layoutProps} />}
      {content.type === "problem" && <ProblemPageLayout {...layoutProps} />}
      {content.type === "comparison" && (
        <ComparisonPageLayout {...layoutProps} />
      )}
      {!["best", "problem", "comparison"].includes(content.type) && (
        <BestPageLayout {...layoutProps} />
      )}
    </Shell>
  );
}
