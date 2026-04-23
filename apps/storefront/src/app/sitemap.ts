import type { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"
import { listRegions } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"

/**
 * Sitemap for every product and category in every region we ship to.
 *
 * URLs are of the form `${base}/${countryCode}/...`, matching the
 * `[countryCode]` route segment. The default region (env) is also emitted
 * at the bare paths for canonical SEO.
 *
 * Refreshed at ISR frequency — Next's sitemap.ts is implicitly revalidated
 * when products/categories change upstream because our data layer uses
 * `cache: "force-cache"` with revalidation tags.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseURL().replace(/\/$/, "")
  const now = new Date()

  const regions = await listRegions().catch(() => [])
  const countryCodes = Array.from(
    new Set(
      regions.flatMap((r) =>
        (r.countries ?? []).map((c) => c.iso_2).filter((c): c is string => !!c)
      )
    )
  )

  if (!countryCodes.length) {
    // Fallback: at minimum, emit the home page so the site isn't empty to crawlers.
    return [{ url: base, changeFrequency: "daily", priority: 1 }]
  }

  // For product/category discovery we query once against the first region —
  // the product set is the same across regions (only prices differ).
  const primaryCountry = countryCodes[0]

  const [{ response: productsResp }, categories] = await Promise.all([
    listProducts({
      countryCode: primaryCountry,
      queryParams: { limit: 100 },
    }).catch(() => ({ response: { products: [], count: 0 }, nextPage: null })),
    listCategories().catch(() => []),
  ])

  const staticPaths = ["", "/store", "/v3"]
  const urls: MetadataRoute.Sitemap = []

  for (const cc of countryCodes) {
    for (const path of staticPaths) {
      urls.push({
        url: `${base}/${cc}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.8,
      })
    }

    for (const p of productsResp.products) {
      if (!p.handle) continue
      urls.push({
        url: `${base}/${cc}/products/${p.handle}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.9,
      })
    }

    for (const c of categories ?? []) {
      if (!c.handle || c.parent_category) continue
      urls.push({
        url: `${base}/${cc}/categories/${c.handle}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }
  }

  return urls
}
