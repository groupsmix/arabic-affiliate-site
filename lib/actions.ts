"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createContent,
  updateContent,
  updateStatus,
  linkProduct,
  unlinkProduct,
  editProduct,
} from "./admin";
import { sanitizeHtml } from "./sanitize";

// --- Validation ---

function validatePublish(data: {
  title?: string;
  slug?: string;
  body?: string;
}): string | null {
  if (!data.title?.trim()) return "العنوان مطلوب";
  if (!data.slug?.trim()) return "الرابط (slug) مطلوب";
  if (!data.body?.trim()) return "المحتوى مطلوب";
  return null;
}

// --- Content actions ---

export async function createContentAction(
  formData: FormData
): Promise<void> {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const body = sanitizeHtml((formData.get("body") as string) ?? "");
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const type = formData.get("type") as string;

  if (!title?.trim() || !slug?.trim()) {
    throw new Error("العنوان والرابط مطلوبان");
  }

  const row = await createContent({
    title: title.trim(),
    slug: slug.trim(),
    body,
    excerpt: excerpt?.trim() || undefined,
    category: category || "best",
    type: type || "best",
  });
  revalidatePath("/");
  redirect(`/admin/content/${row.id}`);
}

export async function updateContentAction(
  formData: FormData
): Promise<void> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const body = sanitizeHtml((formData.get("body") as string) ?? "");
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const type = formData.get("type") as string;

  if (!id) throw new Error("معرّف المحتوى مطلوب");

  await updateContent({
    id,
    title: title?.trim() || undefined,
    slug: slug?.trim() || undefined,
    body: body || undefined,
    excerpt: excerpt?.trim() || undefined,
    category: category || undefined,
    type: type || undefined,
  });
  revalidatePath("/");
  revalidatePath(`/ar/${category}`);
  revalidatePath(`/ar/${category}/${slug}`);
  redirect(`/admin/content/${id}`);
}

export async function updateStatusAction(
  formData: FormData
): Promise<void> {
  const id = formData.get("id") as string;
  const status = formData.get("status") as "idea" | "writing" | "published";
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const body = formData.get("body") as string;
  const category = formData.get("category") as string;

  if (status === "published") {
    const error = validatePublish({ title, slug, body });
    if (error) throw new Error(error);
  }

  await updateStatus({ id, status });
  revalidatePath("/");
  if (category) revalidatePath(`/ar/${category}`);
  if (category && slug) revalidatePath(`/ar/${category}/${slug}`);
  redirect(`/admin/content/${id}`);
}

export async function linkProductAction(
  formData: FormData
): Promise<void> {
  const content_id = formData.get("content_id") as string;
  const product_id = formData.get("product_id") as string;

  if (!content_id || !product_id) {
    throw new Error("معرّف المحتوى والمنتج مطلوبان");
  }

  await linkProduct({ content_id, product_id });
  revalidatePath("/");
  redirect(`/admin/content/${content_id}`);
}

export async function unlinkProductAction(
  formData: FormData
): Promise<void> {
  const content_id = formData.get("content_id") as string;
  const product_id = formData.get("product_id") as string;

  if (!content_id || !product_id) {
    throw new Error("معرّف المحتوى والمنتج مطلوبان");
  }

  await unlinkProduct({ content_id, product_id });
  revalidatePath("/");
  redirect(`/admin/content/${content_id}`);
}

export async function editProductAction(
  formData: FormData
): Promise<void> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const affiliate_url = formData.get("affiliate_url") as string;
  const price = formData.get("price") as string;
  const currency = formData.get("currency") as string;

  if (!id) throw new Error("معرّف المنتج مطلوب");

  await editProduct({
    id,
    name: name?.trim() || undefined,
    affiliate_url: affiliate_url?.trim() || undefined,
    price: price ? parseFloat(price) : undefined,
    currency: currency?.trim() || undefined,
  });
  revalidatePath("/");
}
