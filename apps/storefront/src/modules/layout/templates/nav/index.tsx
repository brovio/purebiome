import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

/**
 * PureBiome site navigation.
 * - Mobile: hamburger (SideMenu) + wordmark + cart
 * - Desktop: wordmark left, primary links centre-ish, account + cart right
 * - Colours: bone background, ink text, cane for active/hover.
 */
export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-bone border-ink/10">
        <nav className="content-container flex items-center justify-between w-full h-full text-sm">
          {/* Left: mobile menu trigger + wordmark */}
          <div className="flex items-center gap-4 h-full">
            <div className="small:hidden h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl text-ink tracking-tight hover:text-cane transition-colors"
              data-testid="nav-store-link"
            >
              PureBiome
            </LocalizedClientLink>
          </div>

          {/* Centre: primary nav (desktop only) */}
          <ul className="hidden small:flex items-center gap-6 h-full text-ink/80">
            <li>
              <LocalizedClientLink
                href="/quiz"
                className="text-cane font-medium hover:text-cane/80 transition-colors"
              >
                Take the Quiz
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/store"
                className="hover:text-cane transition-colors"
              >
                Shop
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/categories/essential"
                className="hover:text-cane transition-colors"
              >
                Essential
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/categories/pro"
                className="hover:text-cane transition-colors"
              >
                Pro
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/recipes"
                className="hover:text-cane transition-colors"
              >
                Recipes
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/blog"
                className="hover:text-cane transition-colors"
              >
                Journal
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/account"
                className="hover:text-cane transition-colors"
              >
                Account
              </LocalizedClientLink>
            </li>
          </ul>

          {/* Right: region pill + cart */}
          <div className="flex items-center gap-x-4 h-full">
            <div className="hidden small:flex h-full items-center">
              {/* Region pill opens the side-menu drawer where the country-select lives. */}
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-ink hover:text-cane transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
