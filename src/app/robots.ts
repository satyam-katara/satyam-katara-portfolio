import type { MetadataRoute } from "next";
import { identity } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(identity.siteUrl ? { sitemap: `${identity.siteUrl}/sitemap.xml` } : {}),
  };
}
