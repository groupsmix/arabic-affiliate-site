export function sanitizeHtml(html: string): string {
  // Remove script tags and their content
  let clean = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );

  // Remove style tags and their content
  clean = clean.replace(
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    ""
  );

  // Remove event handler attributes
  clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "");

  // Remove javascript: URLs
  clean = clean.replace(/href\s*=\s*["']?\s*javascript:/gi, 'href="');

  // Remove data: URLs in src attributes (potential XSS)
  clean = clean.replace(
    /src\s*=\s*["']?\s*data:\s*text\/html/gi,
    'src="'
  );

  // Remove iframe, embed, object, svg, math, base, meta, link tags
  clean = clean.replace(/<\/?(?:iframe|embed|object|form|input|button|svg|math|base|meta|link)\b[^>]*>/gi, "");

  return clean;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
