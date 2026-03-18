"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "./supabase-server";
import { verifyToken } from "./auth";
import { sanitizeHtml, stripHtml } from "./sanitize";
import { slugify } from "./slugify";
import type { Content, Product, Category } from "./types";

// ---- Auth helper ----

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyToken(token))) {
    throw new Error("Unauthorized");
  }
}

// ---- Validation ----

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateContent(
  title: string,
  slug: string,
  body: string,
  type: string,
  hasProducts: boolean
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!title.trim()) errors.push("العنوان مطلوب");
  if (!slug.trim()) errors.push("الرابط المختصر مطلوب");
  if (!body.trim()) errors.push("المحتوى مطلوب");

  if (
    (type === "review" || type === "comparison" || type === "guide") &&
    !hasProducts
  ) {
    warnings.push("صفحة تجارية بدون منتجات مرتبطة");
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ---- Content Actions ----

export async function getAllContent(): Promise<Content[]> {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from("content")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getContentById(id: string): Promise<Content | null> {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from("content")
    .select("*, category:categories(*)")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  if (!data) return null;

  const { data: links } = await supabaseAdmin
    .from("content_products")
    .select("product_id")
    .eq("content_id", data.id);

  if (links && links.length > 0) {
    const productIds = links.map((l) => l.product_id);
    const { data: products } = await supabaseAdmin
      .from("products")
      .select("*")
      .in("id", productIds);
    data.products = products ?? [];
  } else {
    data.products = [];
  }

  return data;
}

export async function createContent(formData: FormData): Promise<{
  success: boolean;
  id?: string;
  errors?: string[];
  warnings?: string[];
}> {
  await requireAdmin();

  const title = (formData.get("title") as string) ?? "";
  let slug = (formData.get("slug") as string) ?? "";
  const body = (formData.get("body") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const type = (formData.get("type") as string) ?? "article";
  const categoryId = (formData.get("category_id") as string) || null;

  if (!slug) slug = slugify(title);

  const validation = validateContent(title, slug, body, type, false);
  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
      warnings: validation.warnings,
    };
  }

  const sanitizedBody = sanitizeHtml(body);
  const sanitizedExcerpt = stripHtml(excerpt);

  const { data, error } = await supabaseAdmin
    .from("content")
    .insert({
      title: title.trim(),
      slug: slug.trim(),
      body: sanitizedBody,
      excerpt: sanitizedExcerpt,
      type,
      category_id: categoryId,
      status: "draft",
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, errors: ["الرابط المختصر مستخدم بالفعل"] };
    }
    throw error;
  }

  return { success: true, id: data.id, warnings: validation.warnings };
}

export async function updateContent(
  id: string,
  formData: FormData
): Promise<{
  success: boolean;
  errors?: string[];
  warnings?: string[];
}> {
  await requireAdmin();

  const title = (formData.get("title") as string) ?? "";
  let slug = (formData.get("slug") as string) ?? "";
  const body = (formData.get("body") as string) ?? "";
  const excerpt = (formData.get("excerpt") as string) ?? "";
  const type = (formData.get("type") as string) ?? "article";
  const categoryId = (formData.get("category_id") as string) || null;

  if (!slug) slug = slugify(title);

  // Fetch old slug before update so we can revalidate it if it changed
  const { data: existing } = await supabaseAdmin
    .from("content")
    .select("slug")
    .eq("id", id)
    .single();
  const oldSlug = existing?.slug;

  // Check if content has linked products
  const { data: links } = await supabaseAdmin
    .from("content_products")
    .select("product_id")
    .eq("content_id", id);
  const hasProducts = (links?.length ?? 0) > 0;

  const validation = validateContent(title, slug, body, type, hasProducts);
  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors,
      warnings: validation.warnings,
    };
  }

  const sanitizedBody = sanitizeHtml(body);
  const sanitizedExcerpt = stripHtml(excerpt);

  const { error } = await supabaseAdmin
    .from("content")
    .update({
      title: title.trim(),
      slug: slug.trim(),
      body: sanitizedBody,
      excerpt: sanitizedExcerpt,
      type,
      category_id: categoryId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { success: false, errors: ["الرابط المختصر مستخدم بالفعل"] };
    }
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/content/" + slug);
  if (oldSlug && oldSlug !== slug.trim()) {
    revalidatePath("/content/" + oldSlug);
  }
  return { success: true, warnings: validation.warnings };
}

export async function updateContentStatus(
  id: string,
  status: "draft" | "published"
): Promise<{ success: boolean; errors?: string[] }> {
  await requireAdmin();

  if (status === "published") {
    const { data: content } = await supabaseAdmin
      .from("content")
      .select("title, slug, body, type")
      .eq("id", id)
      .single();

    if (!content) return { success: false, errors: ["المحتوى غير موجود"] };

    const { data: links } = await supabaseAdmin
      .from("content_products")
      .select("product_id")
      .eq("content_id", id);

    const validation = validateContent(
      content.title,
      content.slug,
      content.body,
      content.type,
      (links?.length ?? 0) > 0
    );

    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }
  }

  const { error } = await supabaseAdmin
    .from("content")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");

  const { data: content } = await supabaseAdmin
    .from("content")
    .select("slug, category:categories(slug)")
    .eq("id", id)
    .single();

  if (content) {
    revalidatePath("/content/" + content.slug);
    const cat = content.category as unknown as { slug: string } | null;
    if (cat) {
      revalidatePath("/category/" + cat.slug);
    }
  }

  return { success: true };
}

export async function deleteContent(id: string): Promise<void> {
  await requireAdmin();
  const { error } = await supabaseAdmin.from("content").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

// ---- Product Actions ----

export async function getAllProducts(): Promise<Product[]> {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
}

export async function createProduct(formData: FormData): Promise<{
  success: boolean;
  id?: string;
  errors?: string[];
}> {
  await requireAdmin();

  const name = (formData.get("name") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const affiliateUrl = (formData.get("affiliate_url") as string) ?? "";
  const imageUrl = (formData.get("image_url") as string) ?? "";
  const price = (formData.get("price") as string) ?? "";

  if (!name.trim()) {
    return { success: false, errors: ["اسم المنتج مطلوب"] };
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name: name.trim(),
      description: stripHtml(description),
      affiliate_url: affiliateUrl.trim(),
      image_url: imageUrl.trim(),
      price: price.trim(),
    })
    .select("id")
    .single();

  if (error) throw error;
  return { success: true, id: data.id };
}

export async function updateProduct(
  id: string,
  formData: FormData
): Promise<{ success: boolean; errors?: string[] }> {
  await requireAdmin();

  const name = (formData.get("name") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const affiliateUrl = (formData.get("affiliate_url") as string) ?? "";
  const imageUrl = (formData.get("image_url") as string) ?? "";
  const price = (formData.get("price") as string) ?? "";

  if (!name.trim()) {
    return { success: false, errors: ["اسم المنتج مطلوب"] };
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      name: name.trim(),
      description: stripHtml(description),
      affiliate_url: affiliateUrl.trim(),
      image_url: imageUrl.trim(),
      price: price.trim(),
    })
    .eq("id", id);

  if (error) throw error;
  return { success: true };
}

export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ---- Product Linking Actions ----

export async function getLinkedProducts(contentId: string): Promise<Product[]> {
  await requireAdmin();
  const { data: links } = await supabaseAdmin
    .from("content_products")
    .select("product_id")
    .eq("content_id", contentId);

  if (!links || links.length === 0) return [];

  const productIds = links.map((l) => l.product_id);
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .in("id", productIds);
  if (error) throw error;
  return data ?? [];
}

export async function getAvailableProducts(
  contentId: string
): Promise<Product[]> {
  await requireAdmin();
  const { data: links } = await supabaseAdmin
    .from("content_products")
    .select("product_id")
    .eq("content_id", contentId);

  const linkedIds = (links ?? []).map((l) => l.product_id);

  let query = supabaseAdmin.from("products").select("*").order("name");
  if (linkedIds.length > 0) {
    query = query.not("id", "in", `(${linkedIds.join(",")})`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function linkProduct(
  contentId: string,
  productId: string
): Promise<void> {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from("content_products")
    .insert({ content_id: contentId, product_id: productId });
  if (error) {
    if (error.code === "23505") return; // already linked, ignore duplicate
    throw error;
  }
}

export async function unlinkProduct(
  contentId: string,
  productId: string
): Promise<void> {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from("content_products")
    .delete()
    .eq("content_id", contentId)
    .eq("product_id", productId);
  if (error) throw error;
}

// ---- Category Actions ----

export async function getAllCategories(): Promise<Category[]> {
  await requireAdmin();
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function createCategory(formData: FormData): Promise<{
  success: boolean;
  errors?: string[];
}> {
  await requireAdmin();

  const name = (formData.get("name") as string) ?? "";
  let slug = (formData.get("slug") as string) ?? "";

  if (!name.trim()) {
    return { success: false, errors: ["اسم التصنيف مطلوب"] };
  }

  if (!slug) slug = slugify(name);

  const { error } = await supabaseAdmin
    .from("categories")
    .insert({ name: name.trim(), slug: slug.trim() });

  if (error) {
    if (error.code === "23505") {
      return { success: false, errors: ["التصنيف موجود بالفعل"] };
    }
    throw error;
  }

  return { success: true };
}

export async function deleteCategory(id: string): Promise<void> {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
