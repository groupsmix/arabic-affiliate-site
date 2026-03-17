export function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    // Replace spaces with hyphens
    .replace(/\s+/g, "-")
    // Remove characters that are not alphanumeric, Arabic, or hyphens
    .replace(/[^\u0600-\u06FF\u0750-\u077Fa-z0-9-]/g, "")
    // Replace multiple hyphens with single hyphen
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}
