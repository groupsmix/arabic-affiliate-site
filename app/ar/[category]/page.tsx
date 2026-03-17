import Link from "next/link";
import { getCategoryPage } from "@/lib/queries";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const articles = await getCategoryPage(category);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category}</h1>

      {articles.length === 0 ? (
        <p className="text-foreground/60">لا توجد مقالات في هذا القسم.</p>
      ) : (
        <ul className="space-y-3">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/ar/${category}/${article.slug}`}
                className="text-lg underline hover:opacity-70"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
