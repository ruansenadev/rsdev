import { MediaField } from "../types/api/field";

export function getStrapiMedia(media: MediaField) {
  return media?.url.startsWith("/") ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}` : media && media.url;
}
