/** Converts an Azerbaijani string to a URL-safe slug. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ç/g, "c")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
