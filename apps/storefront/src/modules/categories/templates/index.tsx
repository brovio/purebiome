import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

/**
 * Brand-specific intros per category handle. Falls back to category.description
 * if the handle isn't listed here — that way the admin can still edit intros
 * in Medusa without redeploying.
 */
const categoryIntros: Record<string, { eyebrow: string; headline: string; blurb: string }> = {
  essential: {
    eyebrow: "Your daily foundation",
    headline: "Essential.",
    blurb:
      "The base layer. One scoop, one sugar-cane prebiotic, twelve live strains. Built for 365 mornings, not 30.",
  },
  pro: {
    eyebrow: "Targeted support",
    headline: "Pro.",
    blurb:
      "Same prebiotic base, tuned for specific jobs. Calm for bloating. Flow for regularity. Stack with Essential or take on their own.",
  },
  bundles: {
    eyebrow: "Less than the sum of its tubs",
    headline: "Bundles.",
    blurb:
      "Pair the daily foundation with a targeted Pro formula and save. No subscription; just fewer checkouts.",
  },
}

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const intro = categoryIntros[category.handle] ?? {
    eyebrow: category.parent_category?.name ?? "Shop",
    headline: category.name,
    blurb: category.description ?? "",
  }

  // Parent breadcrumb chain
  const parents: HttpTypes.StoreProductCategory[] = []
  let cur: HttpTypes.StoreProductCategory | null | undefined =
    category.parent_category
  while (cur) {
    parents.unshift(cur)
    cur = cur.parent_category
  }

  return (
    <div className="bg-bone">
      <div className="content-container pt-16 pb-8">
        {parents.length > 0 && (
          <nav
            className="mb-6 text-xs uppercase tracking-[0.18em] text-ink/50 flex gap-2"
            aria-label="Breadcrumb"
          >
            {parents.map((p) => (
              <span key={p.id}>
                <LocalizedClientLink
                  href={`/categories/${p.handle}`}
                  className="hover:text-cane transition-colors"
                >
                  {p.name}
                </LocalizedClientLink>
                <span aria-hidden className="mx-2 text-ink/30">
                  /
                </span>
              </span>
            ))}
            <span className="text-ink/80">{category.name}</span>
          </nav>
        )}
        <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-3">
          {intro.eyebrow}
        </p>
        <h1
          className="font-display text-5xl md:text-6xl text-ink leading-[1.05]"
          data-testid="category-page-title"
        >
          {intro.headline}
        </h1>
        {intro.blurb && (
          <p className="text-ink/70 mt-4 max-w-xl leading-relaxed">
            {intro.blurb}
          </p>
        )}

        {category.category_children && category.category_children.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {category.category_children.map((c) => (
              <li key={c.id}>
                <LocalizedClientLink
                  href={`/categories/${c.handle}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-ink/15 text-sm text-ink hover:bg-ink hover:text-bone transition-colors"
                >
                  {c.name}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className="flex flex-col small:flex-row small:items-start pb-24 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <div className="w-full">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
