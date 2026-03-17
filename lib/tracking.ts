import { supabase } from "./supabase";

export function trackClick(productId: string, contentId: string) {
  supabase
    .from("clicks")
    .insert({ product_id: productId, content_id: contentId })
    .then(() => {});
}
