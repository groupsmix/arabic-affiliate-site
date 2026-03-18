import Link from "next/link";
import { getAllProducts } from "@/lib/actions";
import { adminLabels } from "@/config/site";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{adminLabels.products}</h1>
        <Link
          href="/admin/products/new"
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80"
        >
          {adminLabels.addProductBtn}
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-foreground/50">{adminLabels.noProducts}</p>
      ) : (
        <div className="border border-foreground/10 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-foreground/5">
              <tr>
                <th className="text-right px-4 py-3 font-medium">{adminLabels.colName}</th>
                <th className="text-right px-4 py-3 font-medium">{adminLabels.colPrice}</th>
                <th className="text-right px-4 py-3 font-medium">
                  {adminLabels.colAffiliateUrl}
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-foreground/10 hover:bg-foreground/5"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="hover:underline font-medium"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground/60">
                    {product.price || "-"}
                  </td>
                  <td className="px-4 py-3 text-foreground/60 truncate max-w-xs">
                    {product.affiliate_url ? (
                      <span dir="ltr" className="text-xs">
                        {product.affiliate_url}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
