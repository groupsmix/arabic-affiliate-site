/**
 * Content type & status definitions.
 *
 * ✉️  EDIT THIS FILE when launching a new niche or translating the site.
 *
 * `value`       — stored in the database and used in URLs / logic.
 * `label`       — human-readable label shown in the UI.
 * `commercial`  — whether the type is considered "commercial" (shows
 *                 affiliate disclosures + product sidebar).
 * `layout`      — page layout: "sidebar" (content + product sidebar) or
 *                 "standard" (full-width body, products grid below).
 * `minProducts` — minimum linked products required before publishing.
 *                 0 means no requirement. Defaults to 0 if omitted.
 *
 * Adding or removing entries here automatically updates the TypeScript
 * union type (`ContentTypeValue`) and all derived lookup maps.
 */
export interface ContentTypeConfig {
  readonly value: string;
  readonly label: string;
  readonly commercial: boolean;
  readonly layout: "sidebar" | "standard";
  readonly minProducts?: number;
}

export const contentTypes = [
  { value: "article", label: "مقال", commercial: false, layout: "standard" },
  { value: "review", label: "مراجعة", commercial: true, layout: "sidebar" },
  { value: "comparison", label: "مقارنة", commercial: true, layout: "sidebar", minProducts: 2 },
  { value: "best", label: "أفضل المنتجات", commercial: true, layout: "sidebar", minProducts: 2 },
  { value: "guide", label: "دليل شراء", commercial: true, layout: "sidebar" },
] as const satisfies readonly ContentTypeConfig[];

/** Union of all configured content-type values (e.g. "article" | "review"). */
export type ContentTypeValue = (typeof contentTypes)[number]["value"];

/** Quick lookup maps derived from the array above */
export const contentTypeLabels: Record<string, string> = Object.fromEntries(
  contentTypes.map((t) => [t.value, t.label])
);

export const commercialTypes: Set<string> = new Set(
  contentTypes.filter((t) => t.commercial).map((t) => t.value)
);

/** Layout lookup: content type value → preferred page layout */
export const contentTypeLayouts: Record<string, "sidebar" | "standard"> =
  Object.fromEntries(contentTypes.map((t) => [t.value, t.layout]));

/** Minimum product count lookup: content type value → minProducts (0 if unset) */
export const contentTypeMinProducts: Record<string, number> =
  Object.fromEntries(contentTypes.map((t) => [t.value, t.minProducts ?? 0]));

/**
 * Status labels for content items.
 * Edit these labels when translating the admin UI.
 */
export const statusLabels: Record<string, string> = {
  draft: "مسودة",
  published: "منشور",
};
