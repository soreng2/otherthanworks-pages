import type { MetadataRoute } from "next";
import { classes, site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/classes",
    ...classes.map((item) => `/classes/${item.slug}`),
    "/work",
    "/work/calendar-making",
    "/studio",
    "/about",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
