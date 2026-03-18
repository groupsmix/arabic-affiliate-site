export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

import type { ContentTypeValue } from "@/config/categories";

export interface Content {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  type: ContentTypeValue;
  status: "draft" | "published";
  category_id: string | null;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  affiliate_url: string;
  image_url: string;
  price: string;
  merchant: string;
  created_at: string;
}

export interface ContentProduct {
  content_id: string;
  product_id: string;
}

export type ContentType = Content["type"];
export type ContentStatus = Content["status"];
