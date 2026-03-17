import Link from "next/link";
import { getAllContent } from "@/lib/admin";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  idea: "فكرة",
  writing: "قيد الكتابة",
  published: "منشور",
};

export default async function AdminPage() {
  const content = await getAllContent();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">إدارة المحتوى</h1>
        <Link
          href="/admin/content/new"
          className="bg-foreground text-background px-4 py-2 rounded text-sm hover:opacity-80"
        >
          محتوى جديد
        </Link>
      </div>

      {content.length === 0 ? (
        <p className="text-foreground/60">لا يوجد محتوى بعد.</p>
      ) : (
        <table className="w-full text-sm border border-foreground/10">
          <thead>
            <tr className="bg-foreground/5">
              <th className="p-3 text-start">العنوان</th>
              <th className="p-3 text-start">القسم</th>
              <th className="p-3 text-start">النوع</th>
              <th className="p-3 text-start">الحالة</th>
              <th className="p-3 text-start">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {content.map((row) => (
              <tr key={row.id} className="border-t border-foreground/10">
                <td className="p-3">{row.title}</td>
                <td className="p-3">{row.category}</td>
                <td className="p-3">{row.type}</td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      row.status === "published"
                        ? "bg-green-100 text-green-800"
                        : row.status === "writing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {STATUS_LABELS[row.status] ?? row.status}
                  </span>
                </td>
                <td className="p-3">
                  <Link
                    href={`/admin/content/${row.id}`}
                    className="underline hover:opacity-70"
                  >
                    تعديل
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
