import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"

/**
 * Homepage product grid — pulls every published product in the current region
 * and lays them out in a 2/4-column grid. Intentionally simple until we have
 * merchandising tiers (step 5 introduces featured V1 product + pro range split).
 */
export default async function HomeProductGrid({
  region,
  countryCode,
}: {
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: { limit: 12 },
  })

  if (!products?.length) return null

  return (
    <section className="bg-bone py-24">
      <div className="content-container">
        <header className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cane/70 mb-3">
              Shop
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05]">
              The full range
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-ink/70 text-sm leading-relaxed">
            One daily foundation. Two targeted formulas. All built on the same
            Australian sugar-cane prebiotic base.
          </p>
        </header>
        <ul
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12"
          data-testid="products-grid"
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
