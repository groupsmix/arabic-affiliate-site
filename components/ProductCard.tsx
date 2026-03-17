import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-foreground/10 rounded-lg p-4">
      {product.image_url && (
        <div className="mb-3">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-40 object-contain rounded"
            loading="lazy"
          />
        </div>
      )}
      <h3 className="font-semibold mb-1">{product.name}</h3>
      {product.description && (
        <p className="text-sm text-foreground/60 mb-2">{product.description}</p>
      )}
      {product.price && (
        <p className="text-sm font-bold mb-3">{product.price}</p>
      )}
      {product.affiliate_url && (
        <a
          href={product.affiliate_url}
          target="_blank"
          rel="nofollow noopener sponsored"
          className="inline-block bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80"
        >
          اشتري الآن
        </a>
      )}
    </div>
  );
}
