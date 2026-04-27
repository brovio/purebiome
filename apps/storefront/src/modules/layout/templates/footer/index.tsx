import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * PureBiome site footer.
 * 4-column layout on desktop, stacked on mobile:
 *   - Wordmark + ethos line
 *   - Shop (pulled from seeded categories)
 *   - Science & Story (static links)
 *   - Company / Legal
 * Bottom strip: © year, Australian-made mark, Monash Low FODMAP line.
 */
export default async function Footer() {
  let productCategories: any[] | null = null
  try {
    productCategories = await listCategories()
  } catch (error) {
    // Backend unavailable — render footer without category links
  }

  return (
    <footer className="bg-ink text-bone w-full">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 py-20">
        {/* Brand + ethos */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <LocalizedClientLink
            href="/"
            className="font-display text-3xl text-bone hover:text-culture transition-colors"
          >
            PureBiome
          </LocalizedClientLink>
          <p className="text-sm text-bone/70 leading-relaxed max-w-sm">
            One daily ritual. Twelve living strains. Australian sugar cane,
            re-sourced for your microbiome — and nothing else you don't need.
          </p>
        </div>

        {/* Shop */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-bone/60">
            Shop
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-bone/85">
            <li>
              <LocalizedClientLink
                href="/store"
                className="hover:text-culture transition-colors"
              >
                All products
              </LocalizedClientLink>
            </li>
            {productCategories?.slice(0, 4).map((c) =>
              c.parent_category ? null : (
                <li key={c.id}>
                  <LocalizedClientLink
                    href={`/categories/${c.handle}`}
                    className="hover:text-culture transition-colors"
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Learn */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-bone/60">
            Learn
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-bone/85">
            <li>
              <LocalizedClientLink
                href="/recipes"
                className="hover:text-culture transition-colors"
              >
                Ritual recipes
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/blog"
                className="hover:text-culture transition-colors"
              >
                Journal
              </LocalizedClientLink>
            </li>
            <li>Our strains</li>
            <li>Sugar-cane prebiotic</li>
          </ul>
        </div>

        {/* Company */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-bone/60">
            Company
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-bone/85">
            <li>
              <LocalizedClientLink
                href="/account"
                className="hover:text-culture transition-colors"
              >
                My account
              </LocalizedClientLink>
            </li>
            <li>Contact</li>
            <li>Shipping &amp; returns</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-bone/10">
        <div className="content-container flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 text-xs text-bone/60">
          <span>
            © {new Date().getFullYear()} PureBiome. Made in Brisbane,
            Australia.
          </span>
          <span className="uppercase tracking-[0.14em]">
            Monash Low FODMAP certified · Gluten &amp; dairy free · TGA listed
          </span>
        </div>
      </div>
    </footer>
  )
}
