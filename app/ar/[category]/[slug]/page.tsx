import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/queries";

function ContentTypeLabel({ type }: { type: string }) {
  switch (type) {
    case "best":
      return <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Best Page</span>;
    case "problem":
      return <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Problem Page</span>;
    case "comparison":
      return <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Comparison Page</span>;
    default:
      return <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">{type}</span>;
  }
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const content = await getContentBySlug(slug);

  if (!content || content.category !== category) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <ContentTypeLabel type={content.type} />
      <h1 className="text-3xl font-bold mt-4 mb-2">{content.title}</h1>
      <p className="text-sm text-foreground/50 mb-6">
        {content.category} &bull; {content.type}
      </p>
      <div className="prose max-w-none">{content.body}</div>
    </main>
  );
}
