import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_name, affiliate_url, content_slug, referrer } = body;

    // Fire-and-forget insert — don't block response on DB
    supabaseAdmin
      .from("affiliate_clicks")
      .insert({
        product_name: (product_name as string)?.slice(0, 255) ?? "",
        affiliate_url: (affiliate_url as string)?.slice(0, 2048) ?? "",
        content_slug: (content_slug as string)?.slice(0, 255) ?? "",
        referrer: (referrer as string)?.slice(0, 255) ?? "",
      })
      .then(({ error }) => {
        if (error) console.error("Affiliate click log error:", error.message);
      });

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: true }, { status: 202 });
  }
}
