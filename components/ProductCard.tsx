import type { Product } from "@/lib/queries";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-foreground/10 rounded p-4">
      <h3 className="font-semibold mb-2">{product.name}</h3>
      {product.price != null && (
        <p className="text-sm text-foreground/60 mb-3">
          {product.price} {product.currency ?? ""}
        </p>
      )}
      <a
        href={product.affiliate_url}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-block bg-foreground text-background px-4 py-2 rounded text-sm hover:opacity-80"
      >
        عرض المنتج
      </a>
    </div>
  );
}
