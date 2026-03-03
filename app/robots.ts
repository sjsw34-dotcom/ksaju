import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/order/success", "/order/fail"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
