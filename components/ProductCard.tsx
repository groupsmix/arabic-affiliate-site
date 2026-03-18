import Image from "next/image";
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
        <div className="mb-3 relative h-40">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain rounded"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
