/**
 * Represents the type of image used in the UI, such as a profile avatar or banner.
 */
export type ImageType = "banner" | "avatar";

/**
 * Returns the given image URL, or a placeholder URL if none is provided.
 *
 * @param url - The image URL to validate.
 * @param width - Optional width for the placeholder image (default is 400).
 * @param height - Optional height for the placeholder image (default is 300).
 * @returns The original URL if valid, otherwise a placeholder image URL.
 */
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
