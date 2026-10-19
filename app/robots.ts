import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Let crawlers read the noindex metadata on /apply and /legal.
      disallow: ["/api/", "/legacy/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
