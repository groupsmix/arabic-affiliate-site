import { sanitizeHtml } from "@/lib/sanitize";

type ContentBodyProps = {
  body: string | null;
};

export default function ContentBody({ body }: ContentBodyProps) {
  if (!body) {
    return (
      <p className="text-foreground/50 py-8 text-center">
        المحتوى قيد الكتابة
      </p>
    );
  }

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
    />
  );
}
