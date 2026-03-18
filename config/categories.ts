/**
 * Content type definitions used across the site.
 *
 * `value`  — stored in the database and used in URLs / logic.
 * `label`  — human-readable label shown in the UI.
 * `commercial` — whether the type is considered "commercial" (shows
 *               affiliate disclosures + product sidebar).
 */
export interface ContentTypeConfig {
  value: string;
  label: string;
  commercial: boolean;
}

export const contentTypes: ContentTypeConfig[] = [
  { value: "article", label: "مقال", commercial: false },
  { value: "review", label: "مراجعة", commercial: true },
  { value: "comparison", label: "مقارنة", commercial: true },
  { value: "guide", label: "دليل شراء", commercial: true },
];

/** Quick lookup maps derived from the array above */
export const contentTypeLabels: Record<string, string> = Object.fromEntries(
  contentTypes.map((t) => [t.value, t.label])
);

export const commercialTypes: Set<string> = new Set(
  contentTypes.filter((t) => t.commercial).map((t) => t.value)
);

/**
 * Status labels for content items.
 */
export const statusLabels: Record<string, string> = {
  draft: "مسودة",
  published: "منشور",
};
