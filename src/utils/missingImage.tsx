export type ImageType = "banner" | "avatar";

export function getPlaceholderImage(
  url: string | undefined,
  width = 400,
  height = 300
): string {
  if (!url || url.trim() === "") {
    return `https://placehold.co/${width}x${height}?text=No+Image`;
  }
  return url;
}