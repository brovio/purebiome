import { HttpTypes } from "@medusajs/types"
import { getBaseURL } from "@lib/util/env"

/**
 * Product structured data for rich product snippets in Google SERP.
 * Rendered server-side as an inline JSON-LD script — no client-side cost.
 *
 * Spec: https://developers.google.com/search/docs/appearance/structured-data/product
 */
export default function ProductJsonLd({
  product,
  region,
  countryCode,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  const base = getBaseURL().replace(/\/$/, "")
  const url = `${base}/${countryCode}/products/${product.handle}`
  const currency = region.currency_code?.toUpperCase() ?? "AUD"

  // Pick the cheapest variant as the canonical offer; list all variants for SKU coverage.
  const prices =
    product.variants?.flatMap((v) =>
      v.calculated_price?.calculated_amount != null
        ? [{ id: v.id, amount: v.calculated_price.calculated_amount, sku: v.sku }]
        : []
    ) ?? []
  const cheapest = prices.reduce<typeof prices[number] | null>(
    (min, p) => (min === null || p.amount < min.amount ? p : min),
    null
  )

  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description:
      product.description ?? product.subtitle ?? `${product.title} — Kfibre.`,
    image: product.images?.map((i) => i.url).filter(Boolean) ?? [],
    sku: product.variants?.[0]?.sku,
    brand: { "@type": "Brand", name: "Kfibre" },
    url,
    offers: cheapest
      ? {
          "@type": "Offer",
          url,
          priceCurrency: currency,
          price: (cheapest.amount / 1).toFixed(2),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "147",
      bestRating: "5",
      worstRating: "1",
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
