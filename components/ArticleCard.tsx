import Link from "next/link";
import type { Content } from "@/lib/types";
import { contentTypeLabels } from "@/config/categories";

interface ArticleCardProps {
  content: Content;
}

export default function ArticleCard({ content }: ArticleCardProps) {
  return (
    <article className="border border-foreground/10 rounded-lg p-5 hover:border-foreground/25 transition-colors">
      <div className="flex items-center gap-2 mb-2 text-sm text-foreground/50">
        {content.category && (
          <Link
            href={`/category/${content.category.slug}`}
            className="hover:underline"
          >
            {content.category.name}
          </Link>
        )}
        {content.category && <span>&middot;</span>}
        <span>{contentTypeLabels[content.type] ?? content.type}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/content/${content.slug}`} className="hover:underline">
          {content.title}
        </Link>
      </h2>
      {content.excerpt && (
        <p className="text-foreground/60 text-sm line-clamp-2">
          {content.excerpt}
        </p>
      )}
      <div className="mt-3 text-xs text-foreground/40">
        {new Date(content.created_at).toLocaleDateString("ar")}
      </div>
    </article>
  );
}
