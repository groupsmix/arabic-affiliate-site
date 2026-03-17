import { sanitizeHtml } from "@/lib/sanitize";

interface ContentBodyProps {
  html: string;
}

export default function ContentBody({ html }: ContentBodyProps) {
  const clean = sanitizeHtml(html);
  return (
    <div
      className="prose prose-lg max-w-none"
      dir="rtl"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
