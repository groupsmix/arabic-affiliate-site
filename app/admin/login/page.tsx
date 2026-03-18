"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig, adminLabels } from "@/config/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(adminLabels.loginWrongPassword);
      }
    } catch {
      setError(adminLabels.loginConnectionError);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center" dir={siteConfig.direction}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-foreground/10 rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">{adminLabels.loginTitle}</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {adminLabels.loginPassword}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
            required
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-background px-4 py-2 rounded font-medium hover:opacity-80 disabled:opacity-50"
        >
          {loading ? adminLabels.loginLoading : adminLabels.loginSubmit}
        </button>
      </form>
    </div>
  );
}
