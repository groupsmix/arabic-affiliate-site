import Link from "next/link";
import { getAllContent } from "@/lib/actions";
import { contentTypeLabels, statusLabels } from "@/config/categories";

export default async function AdminContentListPage() {
  const content = await getAllContent();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المحتوى</h1>
        <Link
          href="/admin/content/new"
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80"
        >
          إنشاء محتوى جديد
        </Link>
      </div>

      {content.length === 0 ? (
        <p className="text-foreground/50">لا يوجد محتوى بعد.</p>
      ) : (
        <div className="border border-foreground/10 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-foreground/5">
              <tr>
                <th className="text-right px-4 py-3 font-medium">العنوان</th>
                <th className="text-right px-4 py-3 font-medium">النوع</th>
                <th className="text-right px-4 py-3 font-medium">الحالة</th>
                <th className="text-right px-4 py-3 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {content.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-foreground/10 hover:bg-foreground/5"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/content/${item.id}`}
                      className="hover:underline font-medium"
                    >
                      {item.title}
                    </Link>
                    {item.category && (
                      <span className="text-foreground/40 text-xs mr-2">
                        ({item.category.name})
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground/60">
                    {contentTypeLabels[item.type] ?? item.type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        item.status === "published"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {statusLabels[item.status] ?? item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground/60">
                    {new Date(item.updated_at).toLocaleDateString("ar")}
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
