import type { Product } from "@/lib/queries";

type ComparisonTableProps = {
  products: Product[];
  variant?: "mini" | "full";
};

export default function ComparisonTable({
  products,
  variant = "full",
}: ComparisonTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-foreground/10 text-sm">
        <thead>
          <tr className="bg-foreground/5">
            <th className="p-3 text-start">المنتج</th>
            {variant === "full" && (
              <th className="p-3 text-start">السعر</th>
            )}
            <th className="p-3 text-start">رابط</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-foreground/10">
              <td className="p-3">{product.name}</td>
              {variant === "full" && (
                <td className="p-3">
                  {product.price != null
                    ? `${product.price} ${product.currency ?? ""}`
                    : "—"}
                </td>
              )}
              <td className="p-3">
                <a
                  href={product.affiliate_url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="underline hover:opacity-70"
                >
                  عرض المنتج
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
