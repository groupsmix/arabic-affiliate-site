import { getAllCategories, createCategory, deleteCategory } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { adminLabels } from "@/config/site";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  async function handleCreate(formData: FormData) {
    "use server";
    await createCategory(formData);
    revalidatePath("/admin/categories");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteCategory(id);
    revalidatePath("/admin/categories");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{adminLabels.categories}</h1>

      <form action={handleCreate} className="flex gap-2 mb-6 max-w-md">
        <input
          type="text"
          name="name"
          placeholder={adminLabels.categoryNamePlaceholder}
          required
          className="flex-1 border border-foreground/20 rounded px-3 py-2 bg-background text-sm"
        />
        <input
          type="text"
          name="slug"
          placeholder={adminLabels.categorySlugPlaceholder}
          className="flex-1 border border-foreground/20 rounded px-3 py-2 bg-background text-sm"
          dir="ltr"
        />
        <button
          type="submit"
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80"
        >
          {adminLabels.addCategory}
        </button>
      </form>

      {categories.length === 0 ? (
        <p className="text-foreground/50">{adminLabels.noCategories}</p>
      ) : (
        <div className="border border-foreground/10 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[400px]">
            <thead className="bg-foreground/5">
              <tr>
                <th className="text-right px-4 py-3 font-medium">{adminLabels.colName}</th>
                <th className="text-right px-4 py-3 font-medium">{adminLabels.colSlug}</th>
                <th className="text-right px-4 py-3 font-medium">{adminLabels.colAction}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-t border-foreground/10 hover:bg-foreground/5"
                >
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-foreground/60" dir="ltr">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-3">
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={cat.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:underline text-xs"
                      >
                        {adminLabels.deleteBtn}
                      </button>
                    </form>
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
