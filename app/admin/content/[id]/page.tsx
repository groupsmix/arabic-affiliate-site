import { notFound } from "next/navigation";
import ContentForm from "@/components/admin/ContentForm";
import ProductLinker from "@/components/admin/ProductLinker";
import {
  getContentById,
  getAllCategories,
  getLinkedProducts,
  getAvailableProducts,
} from "@/lib/actions";
import { adminLabels } from "@/config/site";

interface EditContentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditContentPage({
  params,
}: EditContentPageProps) {
  const { id } = await params;
  const [content, categories] = await Promise.all([
    getContentById(id),
    getAllCategories(),
  ]);

  if (!content) notFound();

  const [linkedProducts, availableProducts] = await Promise.all([
    getLinkedProducts(content.id),
    getAvailableProducts(content.id),
  ]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">{adminLabels.editContent}</h1>
        <span
          className={
            content.status === "published"
              ? "text-green-600 text-sm"
              : "text-yellow-600 text-sm"
          }
        >
          ({content.status === "published" ? adminLabels.statusPublished : adminLabels.statusDraft})
        </span>
      </div>
      <ContentForm content={content} categories={categories} />
      <div className="mt-8">
        <ProductLinker
          contentId={content.id}
          initialLinked={linkedProducts}
          initialAvailable={availableProducts}
        />
      </div>
    </div>
  );
}
