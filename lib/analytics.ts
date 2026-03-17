declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

export function trackAffiliateClick(
  productName: string,
  affiliateUrl: string,
  contentSlug?: string
) {
  trackEvent("affiliate_click", "affiliate", productName);

  // Fire-and-forget to Supabase logging endpoint
  if (typeof window !== "undefined") {
    const body = JSON.stringify({
      product_name: productName,
      affiliate_url: affiliateUrl,
      content_slug: contentSlug ?? "",
      referrer: window.location.pathname,
    });
    navigator.sendBeacon("/api/track/affiliate-click", body);
  }
}

export function trackPageView(path: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}
