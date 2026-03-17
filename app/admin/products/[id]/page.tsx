import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/actions";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">تعديل المنتج</h1>
      <ProductForm product={product} />
    </div>
  );
}
