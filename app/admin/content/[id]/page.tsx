import { notFound } from "next/navigation";
import {
  getContentById,
  getAllProducts,
  getLinkedProductIds,
} from "@/lib/admin";

export const dynamic = "force-dynamic";
import {
  updateContentAction,
  updateStatusAction,
  linkProductAction,
  unlinkProductAction,
} from "@/lib/actions";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await getContentById(id);

  if (!content) {
    notFound();
  }

  const [allProducts, linkedIds] = await Promise.all([
    getAllProducts(),
    getLinkedProductIds(id),
  ]);

  const linkedProducts = allProducts.filter((p) => linkedIds.includes(p.id));
  const unlinkedProducts = allProducts.filter(
    (p) => !linkedIds.includes(p.id)
  );
  const hasProducts = linkedIds.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* --- Edit Content --- */}
      <section>
        <h1 className="text-2xl font-bold mb-4">تعديل المحتوى</h1>

        <form action={updateContentAction} className="space-y-4">
          <input type="hidden" name="id" value={content.id} />

          <div>
            <label className="block text-sm font-medium mb-1">العنوان</label>
            <input
              name="title"
              defaultValue={content.title}
              className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              الرابط (slug)
            </label>
            <input
              name="slug"
              defaultValue={content.slug}
              dir="ltr"
              className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">القسم</label>
              <select
                name="category"
                defaultValue={content.category}
                className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
              >
                <option value="best">الأفضل</option>
                <option value="comparison">المقارنات</option>
                <option value="problem">المشاكل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">النوع</label>
              <select
                name="type"
                defaultValue={content.type}
                className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
              >
                <option value="best">Best</option>
                <option value="comparison">Comparison</option>
                <option value="problem">Problem</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">المقتطف</label>
            <input
              name="excerpt"
              defaultValue={content.excerpt ?? ""}
              className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">المحتوى</label>
            <textarea
              name="body"
              rows={10}
              defaultValue={content.body}
              className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
            />
          </div>

          <button
            type="submit"
            className="bg-foreground text-background px-6 py-2 rounded hover:opacity-80"
          >
            حفظ التعديلات
          </button>
        </form>
      </section>

      {/* --- Status --- */}
      <section className="border-t border-foreground/10 pt-6">
        <h2 className="text-xl font-bold mb-4">حالة النشر</h2>
        <p className="text-sm text-foreground/60 mb-3">
          الحالة الحالية:{" "}
          <span className="font-medium">{content.status}</span>
        </p>

        <div className="flex gap-2 flex-wrap">
          {(["idea", "writing", "published"] as const).map((status) => (
            <form key={status} action={updateStatusAction}>
              <input type="hidden" name="id" value={content.id} />
              <input type="hidden" name="status" value={status} />
              <input type="hidden" name="title" value={content.title} />
              <input type="hidden" name="slug" value={content.slug} />
              <input type="hidden" name="body" value={content.body} />
              <input type="hidden" name="category" value={content.category} />
              <input type="hidden" name="type" value={content.type} />
              <input
                type="hidden"
                name="hasProducts"
                value={hasProducts ? "true" : "false"}
              />
              <button
                type="submit"
                disabled={content.status === status}
                className={`px-4 py-1.5 rounded text-sm ${
                  content.status === status
                    ? "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                    : "bg-foreground text-background hover:opacity-80"
                }`}
              >
                {status === "idea"
                  ? "فكرة"
                  : status === "writing"
                    ? "قيد الكتابة"
                    : "نشر"}
              </button>
            </form>
          ))}
        </div>

        {!hasProducts &&
          ["best", "comparison"].includes(content.type) && (
            <p className="text-sm text-yellow-600 mt-3">
              تحذير: لا توجد منتجات مرتبطة بهذا المحتوى
            </p>
          )}
      </section>

      {/* --- Linked Products --- */}
      <section className="border-t border-foreground/10 pt-6">
        <h2 className="text-xl font-bold mb-4">المنتجات المرتبطة</h2>

        {linkedProducts.length === 0 ? (
          <p className="text-foreground/60 text-sm">لا توجد منتجات مرتبطة.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {linkedProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between border border-foreground/10 rounded px-3 py-2"
              >
                <span className="text-sm">{product.name}</span>
                <form action={unlinkProductAction}>
                  <input
                    type="hidden"
                    name="content_id"
                    value={content.id}
                  />
                  <input
                    type="hidden"
                    name="product_id"
                    value={product.id}
                  />
                  <button
                    type="submit"
                    className="text-red-600 text-sm hover:opacity-70"
                  >
                    إزالة
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        {unlinkedProducts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">ربط منتج جديد</h3>
            {unlinkedProducts.map((product) => (
              <form
                key={product.id}
                action={linkProductAction}
                className="inline-block ml-2 mb-2"
              >
                <input type="hidden" name="content_id" value={content.id} />
                <input type="hidden" name="product_id" value={product.id} />
                <button
                  type="submit"
                  className="text-sm border border-foreground/20 rounded px-3 py-1 hover:bg-foreground/5"
                >
                  + {product.name}
                </button>
              </form>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
