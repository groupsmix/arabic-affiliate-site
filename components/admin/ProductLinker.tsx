"use client";

import { useState } from "react";
import {
  getLinkedProducts,
  getAvailableProducts,
  linkProduct,
  unlinkProduct,
} from "@/lib/actions";
import type { Product } from "@/lib/types";

interface ProductLinkerProps {
  contentId: string;
  initialLinked: Product[];
  initialAvailable: Product[];
}

export default function ProductLinker({
  contentId,
  initialLinked,
  initialAvailable,
}: ProductLinkerProps) {
  const [linked, setLinked] = useState<Product[]>(initialLinked);
  const [available, setAvailable] = useState<Product[]>(initialAvailable);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);

  async function refreshProducts() {
    try {
      const [l, a] = await Promise.all([
        getLinkedProducts(contentId),
        getAvailableProducts(contentId),
      ]);
      setLinked(l);
      setAvailable(a);
    } catch {
      // silent fail
    }
  }

  async function handleLink() {
    if (!selectedId) return;
    setLoading(true);
    try {
      await linkProduct(contentId, selectedId);
      setSelectedId("");
      await refreshProducts();
    } catch {
      // silent fail
    }
    setLoading(false);
  }

  async function handleUnlink(productId: string) {
    setLoading(true);
    try {
      await unlinkProduct(contentId, productId);
      await refreshProducts();
    } catch {
      // silent fail
    }
    setLoading(false);
  }

  return (
    <div className="border border-foreground/10 rounded-lg p-4">
      <h3 className="font-semibold mb-3">المنتجات المرتبطة</h3>

      {linked.length === 0 && (
        <p className="text-sm text-foreground/50 mb-3">لا توجد منتجات مرتبطة</p>
      )}

      {linked.length > 0 && (
        <ul className="space-y-2 mb-4">
          {linked.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between text-sm border border-foreground/10 rounded px-3 py-2"
            >
              <span>{p.name}</span>
              <button
                onClick={() => handleUnlink(p.id)}
                disabled={loading}
                className="text-red-600 hover:underline text-xs disabled:opacity-50"
              >
                إزالة
              </button>
            </li>
          ))}
        </ul>
      )}

      {available.length > 0 && (
        <div className="flex gap-2">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="flex-1 border border-foreground/20 rounded px-3 py-2 bg-background text-sm"
          >
            <option value="">اختر منتج لربطه...</option>
            {available.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleLink}
            disabled={loading || !selectedId}
            className="bg-foreground text-background px-3 py-2 rounded text-sm disabled:opacity-50"
          >
            ربط
          </button>
        </div>
      )}
    </div>
  );
}
