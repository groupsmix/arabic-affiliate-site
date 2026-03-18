"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error.message, error.digest);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      dir={siteConfig.direction}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{siteConfig.errorHeading}</h2>
        <p className="text-foreground/60 mb-6">
          {siteConfig.errorMessage}
        </p>
        <button
          onClick={reset}
          className="bg-foreground text-background px-6 py-2 rounded font-medium hover:opacity-80"
        >
          {siteConfig.errorRetryLabel}
        </button>
      </div>
    </div>
  );
}
