import { redirect } from "next/navigation";
import { createContentAction } from "@/lib/actions";

export default function NewContentPage() {
  async function handleCreate(formData: FormData) {
    "use server";
    const result = await createContentAction(formData);
    if (result.success && result.id) {
      redirect(`/admin/content/${result.id}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">محتوى جديد</h1>

      <form action={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">العنوان *</label>
          <input
            name="title"
            required
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            الرابط (slug) *
          </label>
          <input
            name="slug"
            required
            dir="ltr"
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">القسم</label>
            <select
              name="category"
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
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">المحتوى</label>
          <textarea
            name="body"
            rows={10}
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          />
        </div>

        <button
          type="submit"
          className="bg-foreground text-background px-6 py-2 rounded hover:opacity-80"
        >
          إنشاء
        </button>
      </form>
    </div>
  );
}
