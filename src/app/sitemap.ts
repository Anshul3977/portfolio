import type { MetadataRoute } from "next";
import { selectedWork } from "../../content/projects";
import { site } from "../../content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-11-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...selectedWork.map((p) => ({
      url: site.url + "/work/" + p.slug,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
