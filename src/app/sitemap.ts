import type { MetadataRoute } from "next";

export const revalidate = false;

const baseUrl = "https://learnhub.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
