import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-bone">
      <div className="content-container pt-16 pb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-3">
          The full range
        </p>
        <h1
          className="font-display text-5xl md:text-6xl text-ink leading-[1.05]"
          data-testid="store-page-title"
        >
          Every tub we make.
        </h1>
        <p className="text-ink/70 mt-4 max-w-xl">
          Essential for your daily foundation. Pro for when something specific
          needs attention. All on the same sugar-cane prebiotic base.
        </p>
      </div>
      <div
        className="flex flex-col small:flex-row small:items-start pb-24 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
