/**
 * Content type & status definitions.
 *
 * ✉️  EDIT THIS FILE when launching a new niche or translating the site.
 *
 * `value`       — stored in the database and used in URLs / logic.
 * `label`       — human-readable label shown in the UI.
 * `commercial`  — whether the type is considered “commercial” (shows
 *                 affiliate disclosures + product sidebar).
 *
 * Adding or removing entries here automatically updates the TypeScript
 * union type (`ContentTypeValue`) and all derived lookup maps.
 */
export interface ContentTypeConfig {
  readonly value: string;
  readonly label: string;
  readonly commercial: boolean;
}

export const contentTypes = [
  { value: "article", label: "مقال", commercial: false },
  { value: "review", label: "مراجعة", commercial: true },
  { value: "comparison", label: "مقارنة", commercial: true },
  { value: "guide", label: "دليل شراء", commercial: true },
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

/**
 * Status labels for content items.
 * Edit these labels when translating the admin UI.
 */
export const statusLabels: Record<string, string> = {
  draft: "مسودة",
  published: "منشور",
};
