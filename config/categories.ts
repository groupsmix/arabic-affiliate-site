import { siteConfig } from "./site";

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

// ── Category display & navigation ─────────────────────────────
//
// EDIT THIS SECTION when launching a new niche.
//
// DB categories are the source of truth for *what categories exist*.
// This config controls *how they are displayed* on the public site:
// navigation order, display labels, and SEO descriptions.
//
// Categories not listed in `categoryDisplay` fall back to their DB name
// and the default description template from siteConfig.

/**
 * Optional per-category display overrides.
 * Key = DB category slug.
 */
export interface CategoryDisplayConfig {
  /** Override the public display label (default: DB category name) */
  label?: string;
  /** Category page meta description (default: siteConfig.categoryDescriptionTemplate) */
  description?: string;
}

/**
 * Map of category slug → display overrides.
 *
 * Example for a tech-review niche:
 * ```
 * export const categoryDisplay: Record<string, CategoryDisplayConfig> = {
 *   "laptops":  { label: "لابتوبات", description: "مراجعات ومقارنات أفضل اللابتوبات" },
 *   "phones":   { label: "هواتف", description: "أفضل الهواتف الذكية - مراجعات وأدلة شراء" },
 * };
 * ```
 */
export const categoryDisplay: Record<string, CategoryDisplayConfig> = {
  // Add entries here for your niche categories.
};

/**
 * Header navigation configuration.
 *
 * If `headerCategories` lists category slugs, only those categories
 * appear in the site header, in that order.
 *
 * If `headerCategories` is empty or undefined, all DB categories
 * are shown in their default (alphabetical) order.
 */
export const navigationConfig: { headerCategories?: string[] } = {
  // Uncomment and list slugs to control header nav:
  // headerCategories: ["laptops", "phones", "tablets"],
};

// ── Category helpers ────────────────────────────────────────

/** Resolve the public display label for a category. */
export function getCategoryLabel(category: {
  slug: string;
  name: string;
}): string {
  return categoryDisplay[category.slug]?.label ?? category.name;
}

/** Resolve the SEO meta description for a category page. */
export function getCategoryDescription(category: {
  slug: string;
  name: string;
}): string {
  return (
    categoryDisplay[category.slug]?.description ??
    siteConfig.categoryDescriptionTemplate.replace(
      "%s",
      getCategoryLabel(category)
    )
  );
}

/**
 * Filter and order categories for header navigation.
 * Respects `navigationConfig.headerCategories` when set.
 */
export function getNavCategories<T extends { slug: string }>(
  categories: T[]
): T[] {
  const { headerCategories } = navigationConfig;
  if (!headerCategories || headerCategories.length === 0) return categories;
  return headerCategories
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is T => c != null);
}
