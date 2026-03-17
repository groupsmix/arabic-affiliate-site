import Link from "next/link";
import type { ContentCard } from "@/lib/queries";

export default function ArticleCard({ article }: { article: ContentCard }) {
  return (
    <Link
      href={`/ar/${article.category}/${article.slug}`}
      className="block border border-foreground/10 rounded p-4 hover:bg-foreground/5"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs bg-foreground/10 px-2 py-0.5 rounded">
          {article.type}
        </span>
        <span className="text-xs text-foreground/50">{article.category}</span>
      </div>
      <h3 className="text-lg font-semibold">{article.title}</h3>
      {article.excerpt && (
        <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
          {article.excerpt}
        </p>
      )}
    </Link>
  );
}
