import ContentForm from "@/components/admin/ContentForm";
import { getAllCategories } from "@/lib/actions";

export default async function NewContentPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">محتوى جديد</h1>
      <ContentForm categories={categories} />
    </div>
  );
}
