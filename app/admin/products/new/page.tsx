import ProductForm from "@/components/admin/ProductForm";
import { adminLabels } from "@/config/site";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{adminLabels.newProduct}</h1>
      <ProductForm />
    </div>
  );
}
