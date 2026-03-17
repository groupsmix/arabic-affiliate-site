"use client";

import { useEffect } from "react";

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
      dir="rtl"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">حدث خطأ</h2>
        <p className="text-foreground/60 mb-6">
          نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.
        </p>
        <button
          onClick={reset}
          className="bg-foreground text-background px-6 py-2 rounded font-medium hover:opacity-80"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
