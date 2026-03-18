"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions";
import type { Product } from "@/lib/types";
import { siteConfig, adminLabels } from "@/config/site";

interface ProductFormProps {
  product?: Product | null;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [affiliateUrl, setAffiliateUrl] = useState(
    product?.affiliate_url ?? ""
  );
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [merchant, setMerchant] = useState(product?.merchant ?? "");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    formData.set("affiliate_url", affiliateUrl);
    formData.set("image_url", imageUrl);
    formData.set("price", price);
    formData.set("merchant", merchant);

    try {
      if (isEdit && product) {
        const result = await updateProduct(product.id, formData);
        if (!result.success) {
          setErrors(result.errors ?? []);
          setLoading(false);
          return;
        }
        router.refresh();
      } else {
        const result = await createProduct(formData);
        if (!result.success) {
          setErrors(result.errors ?? []);
          setLoading(false);
          return;
        }
        router.push(`/admin/products/${result.id}`);
      }
    } catch {
      setErrors([adminLabels.unexpectedError]);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm(adminLabels.confirmDeleteProduct)) return;
    setLoading(true);
    try {
      await deleteProduct(product.id);
      router.push("/admin/products");
    } catch {
      setErrors([adminLabels.deleteError]);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldProductName}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldDescription}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldAffiliateUrl}</label>
        <input
          type="url"
          value={affiliateUrl}
          onChange={(e) => setAffiliateUrl(e.target.value)}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          dir="ltr"
          placeholder="https://"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldImageUrl}</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          dir="ltr"
          placeholder="https://"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldPrice}</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          placeholder={siteConfig.pricePlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{siteConfig.merchantLabel}</label>
        <input
          type="text"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          placeholder="مثال: Amazon, Noon"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80 disabled:opacity-50"
        >
          {loading ? adminLabels.saving : isEdit ? adminLabels.saveChanges : adminLabels.create}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:opacity-80 disabled:opacity-50"
          >
            {adminLabels.deleteBtn}
          </button>
        )}
      </div>
    </form>
  );
}
