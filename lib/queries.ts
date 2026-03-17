import { supabase } from "./supabase";

// --- Lightweight types ---

export type ContentCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  type: string;
  created_at: string;
};

export type ContentRow = ContentCard & {
  body: string;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
};

export type Product = {
  id: string;
  name: string;
  image_url: string | null;
  affiliate_url: string;
  price: number | null;
  currency: string | null;
};

// --- Card-level select fields ---

const CARD_FIELDS = "id, title, slug, excerpt, category, type, created_at";

// --- Query functions ---

export async function getHomepageData(): Promise<ContentCard[]> {
  const { data, error } = await supabase
    .from("content")
    .select(CARD_FIELDS)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data ?? [];
}

export async function getCategoryPage(
  category: string
): Promise<ContentCard[]> {
  const { data, error } = await supabase
    .from("content")
    .select(CARD_FIELDS)
    .eq("status", "published")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getContentBySlug(
  slug: string
): Promise<ContentRow | null> {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
}

export async function getLinkedProducts(
  contentId: string
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("content_products")
    .select("products(*)")
    .eq("content_id", contentId);

  if (error) throw error;

  return (data ?? []).flatMap(
    (row: { products: Product | Product[] }) =>
      Array.isArray(row.products) ? row.products : [row.products]
  );
}

export async function getRelatedArticles(
  category: string,
  excludeSlug: string
): Promise<ContentCard[]> {
  const { data, error } = await supabase
    .from("content")
    .select(CARD_FIELDS)
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) throw error;
  return data ?? [];
}
