import type { MetadataRoute } from "next";
import { identity } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!identity.siteUrl) return [];
  return [
    {
      url: identity.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
