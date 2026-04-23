import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

/**
 * Thin strip at the very top of every page.
 * Tells the visitor where we ship to, the free-shipping threshold for their
 * region, and the dispatch window. Region is inferred from the country code
 * param in the URL (set by the middleware from the IP geo header).
 */
export default async function GeoBar({
  countryCode,
}: {
  countryCode: string
}) {
  const regions: StoreRegion[] = await listRegions()
  const region = regions.find((r) =>
    r.countries?.some((c) => c.iso_2 === countryCode)
  )

  const isAu = region?.name === "Australia"
  const freeOver = isAu ? "A$99" : "US$69"
  const dispatch = isAu
    ? "Dispatched Mon–Fri from Brisbane"
    : "Tracked worldwide, 5–10 business days"
  const flag = isAu ? "🇦🇺" : "🌏"
  const label = isAu ? "Australia" : region?.name ?? "International"

  return (
    <div className="w-full bg-cane text-bone text-xs tracking-wide">
      <div className="content-container flex items-center justify-between gap-4 py-2">
        <span className="flex items-center gap-2">
          <span aria-hidden>{flag}</span>
          <span className="hidden sm:inline">Shipping to</span>
          <span className="font-medium">{label}</span>
        </span>
        <span className="hidden md:inline text-bone/80">
          Free delivery over {freeOver}
        </span>
        <span className="hidden lg:inline text-bone/70">{dispatch}</span>
        <span className="lg:hidden text-bone/80">Free over {freeOver}</span>
      </div>
    </div>
  )
}
