export type ImageType = "banner" | "avatar";

export function getPlaceholderImage(type: ImageType): string {
  switch (type) {
    case "avatar":
      return "https://via.placeholder.com/100?text=Avatar";
    case "banner":
    default:
      return "https://via.placeholder.com/400x300?text=Banner";
  }
}
