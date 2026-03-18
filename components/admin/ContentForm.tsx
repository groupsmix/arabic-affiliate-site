"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  createContent,
  updateContent,
  updateContentStatus,
  deleteContent,
} from "@/lib/actions";
import type { Content, Category } from "@/lib/types";
import { slugify } from "@/lib/slugify";
import { contentTypes } from "@/config/categories";
import type { ContentTypeValue } from "@/config/categories";
import { adminLabels } from "@/config/site";

interface ContentFormProps {
  content?: Content | null;
  categories: Category[];
}

export default function ContentForm({
  content,
  categories,
}: ContentFormProps) {
  const router = useRouter();
  const isEdit = !!content;

  const [title, setTitle] = useState(content?.title ?? "");
  const [slug, setSlug] = useState(content?.slug ?? "");
  const [body, setBody] = useState(content?.body ?? "");
  const [excerpt, setExcerpt] = useState(content?.excerpt ?? "");
  const [type, setType] = useState(content?.type ?? "article");
  const [categoryId, setCategoryId] = useState(content?.category_id ?? "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      if (autoSlug) {
        setSlug(slugify(value));
      }
    },
    [autoSlug]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setWarnings([]);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("body", body);
    formData.set("excerpt", excerpt);
    formData.set("type", type);
    formData.set("category_id", categoryId);

    try {
      if (isEdit && content) {
        const result = await updateContent(content.id, formData);
        if (!result.success) {
          setErrors(result.errors ?? []);
          setWarnings(result.warnings ?? []);
          setLoading(false);
          return;
        }
        if (result.warnings?.length) setWarnings(result.warnings);
        router.refresh();
      } else {
        const result = await createContent(formData);
        if (!result.success) {
          setErrors(result.errors ?? []);
          setWarnings(result.warnings ?? []);
          setLoading(false);
          return;
        }
        if (result.warnings?.length) setWarnings(result.warnings);
        router.push(`/admin/content/${result.id}`);
      }
    } catch {
      setErrors([adminLabels.unexpectedError]);
    }
    setLoading(false);
  }

  async function handleStatusChange(newStatus: "draft" | "published") {
    if (!content) return;
    setLoading(true);
    setErrors([]);
    setWarnings([]);
    try {
      const result = await updateContentStatus(content.id, newStatus);
      if (!result.success) {
        setErrors(result.errors ?? []);
        setLoading(false);
        return;
      }
      if (result.warnings?.length) setWarnings(result.warnings);
      router.refresh();
    } catch {
      setErrors([adminLabels.unexpectedError]);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!content) return;
    if (!confirm(adminLabels.confirmDeleteContent)) return;
    setLoading(true);
    try {
      await deleteContent(content.id);
      router.push("/admin");
    } catch {
      setErrors([adminLabels.deleteError]);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}
      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded text-sm">
          {warnings.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldTitle}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {adminLabels.fieldSlug}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setAutoSlug(false);
            }}
            className="flex-1 border border-foreground/20 rounded px-3 py-2 bg-background font-mono text-sm"
            dir="ltr"
            required
          />
          {!autoSlug && (
            <button
              type="button"
              onClick={() => {
                setAutoSlug(true);
                setSlug(slugify(title));
              }}
              className="text-xs text-foreground/50 hover:text-foreground"
            >
              {adminLabels.autoSlug}
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{adminLabels.fieldType}</label>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as ContentTypeValue)
            }
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          >
            {contentTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{adminLabels.fieldCategory}</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
          >
            <option value="">{adminLabels.noCategory}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{adminLabels.fieldExcerpt}</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {adminLabels.fieldBody}
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          className="w-full border border-foreground/20 rounded px-3 py-2 bg-background font-mono text-sm"
          dir="rtl"
          required
        />
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background px-4 py-2 rounded text-sm font-medium hover:opacity-80 disabled:opacity-50"
        >
          {loading ? adminLabels.saving : isEdit ? adminLabels.saveChanges : adminLabels.create}
        </button>

        {isEdit && content && (
          <>
            {content.status === "draft" ? (
              <button
                type="button"
                onClick={() => handleStatusChange("published")}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:opacity-80 disabled:opacity-50"
              >
                {adminLabels.publish}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleStatusChange("draft")}
                disabled={loading}
                className="bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium hover:opacity-80 disabled:opacity-50"
              >
                {adminLabels.unpublish}
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:opacity-80 disabled:opacity-50"
            >
              {adminLabels.deleteBtn}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
