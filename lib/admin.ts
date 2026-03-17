import { supabase } from "./supabase";
import type { ContentRow, Product } from "./queries";

// --- Input types ---

type CreateContentInput = {
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  category: string;
  type: string;
  status?: string;
  meta_title?: string;
  meta_description?: string;
};

type UpdateContentInput = {
  id: string;
  title?: string;
  slug?: string;
  body?: string;
  excerpt?: string;
  category?: string;
  type?: string;
  meta_title?: string;
  meta_description?: string;
};

type UpdateStatusInput = {
  id: string;
  status: "idea" | "writing" | "published";
};

type LinkProductInput = {
  content_id: string;
  product_id: string;
};

type EditProductInput = {
  id: string;
  name?: string;
  image_url?: string | null;
  affiliate_url?: string;
  price?: number | null;
  currency?: string | null;
};

// --- Admin queries ---

export async function getAllContent(): Promise<ContentRow[]> {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getContentById(id: string): Promise<ContentRow | null> {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getLinkedProductIds(contentId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("content_products")
    .select("product_id")
    .eq("content_id", contentId);

  if (error) throw error;
  return (data ?? []).map((row: { product_id: string }) => row.product_id);
}

// --- Mutations ---

export async function createContent(input: CreateContentInput) {
  const { data, error } = await supabase
    .from("content")
    .insert({ status: "idea", ...input })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("يوجد محتوى بنفس الرابط (slug) بالفعل.");
    }
    throw error;
  }
  return data;
}

export async function updateContent({ id, ...fields }: UpdateContentInput) {
  const { data, error } = await supabase
    .from("content")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("يوجد محتوى بنفس الرابط (slug) بالفعل.");
    }
    throw error;
  }
  return data;
}

export async function updateStatus({ id, status }: UpdateStatusInput) {
  const { data, error } = await supabase
    .from("content")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function linkProduct({ content_id, product_id }: LinkProductInput) {
  const { error } = await supabase
    .from("content_products")
    .insert({ content_id, product_id });

  if (error) throw error;
}

export async function unlinkProduct({ content_id, product_id }: LinkProductInput) {
  const { error } = await supabase
    .from("content_products")
    .delete()
    .eq("content_id", content_id)
    .eq("product_id", product_id);

  if (error) throw error;
}

export async function editProduct({ id, ...fields }: EditProductInput) {
  const { data, error } = await supabase
    .from("products")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
