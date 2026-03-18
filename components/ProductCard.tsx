import type { Product } from "@/lib/types";
import AffiliateLink from "@/components/AffiliateLink";

interface ProductCardProps {
  product: Product;
  contentSlug?: string;
}

export default function ProductCard({ product, contentSlug }: ProductCardProps) {
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
        <div className="mb-3">
          <p className="text-sm font-bold">{product.price}</p>
          <p className="text-xs text-foreground/40">السعر إرشادي وقد يتغير</p>
        </div>
      )}
      {product.affiliate_url && (
        <AffiliateLink
          href={product.affiliate_url}
          productName={product.name}
          contentSlug={contentSlug}
          className="block w-full text-center bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80"
        >
          اشتري الآن
        </AffiliateLink>
      )}
    </div>
  );
}
