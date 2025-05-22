import avatarPlaceholder from "../assets/avatar.jpg";
import bannerPlaceholder from "../assets/banner.jpg";

export type ImageType = "banner" | "avatar";

export function getPlaceholderImage(type: ImageType): string {
  switch (type) {
    case "avatar":
      return avatarPlaceholder;
    case "banner":
    default:
      return bannerPlaceholder;
  }
}