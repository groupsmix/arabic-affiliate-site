import { cache } from "react";
import { supabase } from "./supabase";
import type { Category, Content } from "./types";

// ---- Public Queries (use anon key, respect RLS) ----

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export const getCategoryBySlug = cache(async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
});

export async function getPublishedContent(): Promise<Content[]> {
  const { data, error } = await supabase
    .from("content")
    .select("*, category:categories(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPublishedContentByCategory(
  categorySlug: string
): Promise<Content[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  const { data, error } = await supabase
    .from("content")
    .select("*, category:categories(*)")
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export const getContentBySlug = cache(async function getContentBySlug(
  slug: string
): Promise<Content | null> {
  const { data, error } = await supabase
    .from("content")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error && error.code !== "PGRST116") throw error;
  if (!data) return null;

  // Fetch linked products
  const { data: links } = await supabase
    .from("content_products")
    .select("product_id")
    .eq("content_id", data.id);

  if (links && links.length > 0) {
    const productIds = links.map((l) => l.product_id);
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);
    data.products = products ?? [];
  } else {
    data.products = [];
  }

  return data;
});
