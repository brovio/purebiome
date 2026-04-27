// Last verified: 2026-04-26T22:56:19.973Z
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ countryCode: 'us' }]
}

/**
 * Checkout shell.
 * Reduced chrome: no main nav, no footer, no geobar — just a back-to-cart
 * chevron on the left and the PureBiome wordmark centre. Bone background to
 * keep the visual continuity with the rest of the storefront.
 */
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-bone relative min-h-screen">
      <div className="h-16 bg-bone border-b border-ink/10">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-sm text-ink/70 flex items-center gap-x-2 flex-1 basis-0 hover:text-cane transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="hidden small:block">Back to cart</span>
            <span className="block small:hidden">Back</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-display text-2xl text-ink hover:text-cane transition-colors"
            data-testid="store-link"
          >
            PureBiome
          </LocalizedClientLink>
          <div className="flex-1 basis-0 flex justify-end">
            <span className="hidden small:flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink/50">
              <span aria-hidden>🔒</span> Secure checkout
            </span>
          </div>
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-10 w-full flex items-center justify-center text-xs text-ink/50 uppercase tracking-[0.14em]">
        © {new Date().getFullYear()} PureBiome · Made in Brisbane
      </div>
    </div>
  )
}
