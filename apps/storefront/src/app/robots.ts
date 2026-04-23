import type { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"

/**
 * Disallow anything that's private or transactional; everything else is
 * fair game. The sitemap lives alongside.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/checkout", "/cart", "/api"],
      },
    ],
    sitemap: `${getBaseURL()}/sitemap.xml`,
  }
}
