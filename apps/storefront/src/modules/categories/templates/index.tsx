import { notFound } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import RecipeCard from "@modules/recipes/components/recipe-card"
import { HttpTypes } from "@medusajs/types"
import { recipes } from "../../../content/recipes/recipes"

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

/**
 * Per-handle editorial composition. When a handle is present here, the
 * category page renders a rich visual story around the product grid
 * (hero image band, ritual strip, FAQ). Missing handles fall back to
 * the plain grid — so adding new categories via Medusa admin doesn't
 * break anything.
 */
type EditorialConfig = {
  heroImage: string
  heroAlt: string
  ritual?: Array<{ image: string; alt: string; title: string; body: string }>
  faq?: Array<{ q: string; a: string }>
}

const editorial: Record<string, EditorialConfig> = {
  essential: {
    heroImage: "/images/products/range-lineup.webp",
    heroAlt: "The Kfibre Essential range lined up",
    ritual: [
      {
        image: "/images/products/tub-neutral.webp",
        alt: "Kfibre Essential Tub, Neutral",
        title: "Morning scoop",
        body: "One teaspoon, any liquid. Seven seconds before the coffee lands.",
      },
      {
        image: "/images/products/sachets-neutral.webp",
        alt: "Kfibre Essential Sachets",
        title: "Midday sachet",
        body: "Same formula, single-serve. Keeps the ritual on the road.",
      },
      {
        image: "/images/products/tub-berry.webp",
        alt: "Kfibre Essential Tub, Berry",
        title: "Berry or Neutral",
        body: "Two flavours, same backbone. Neutral hides in anything. Berry for the water-bottle crowd.",
      },
    ],
    faq: [
      {
        q: "Tub or sachets — which should I start with?",
        a: "Tub if you're home most mornings; sachets if you're not. The formula is identical. Most people end up with both.",
      },
      {
        q: "Is this Low FODMAP?",
        a: "Yes — Monash Low FODMAP certified. The prebiotic is long-chain sugar-cane fibre; it feeds the microbiome without fermenting aggressively on the way through.",
      },
      {
        q: "How long until I notice something?",
        a: "Three to five days for most people. Two weeks is the honest number for anything microbiome-driven to settle.",
      },
      {
        q: "Subscription?",
        a: "No. Buy when the tub's empty. No saved cards, no surprise renewals.",
      },
    ],
  },
  pro: {
    heroImage: "/images/products/tub-berry.webp",
    heroAlt: "Kfibre Pro — targeted gut-health formulas",
    ritual: [
      {
        image: "/images/products/tub-berry.webp",
        alt: "Kfibre Calm",
        title: "Calm",
        body: "For dietary bloating and indigestion. Berry, taken after meals that don't love you back.",
      },
      {
        image: "/images/products/tub-citrus.webp",
        alt: "Kfibre Flow",
        title: "Flow",
        body: "For regularity support. Citrus, taken with breakfast. Pair with 2L of water.",
      },
      {
        image: "/images/products/range-lineup.webp",
        alt: "Stacking Pro with Essential",
        title: "Stack with Essential",
        body: "Pro formulas are targeted on top of — not instead of — your daily base. The Bundle saves you the postage.",
      },
    ],
    faq: [
      {
        q: "Can I take Calm and Flow at the same time?",
        a: "You can, but you probably don't need both. Pick the one that matches the job; switch if the job changes.",
      },
      {
        q: "Is Pro a replacement for Essential?",
        a: "No. Pro is layered on top of your daily base. Think targeted, not foundational.",
      },
      {
        q: "How long before Calm works?",
        a: "Post-meal relief on day one for some, 3–5 days for most. If nothing's shifted by a week, it's the wrong tool — email us.",
      },
      {
        q: "Is Pro Low FODMAP?",
        a: "Yes. Same Monash certification as Essential; same sugar-cane base, tuned formulation.",
      },
    ],
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
  const story = editorial[category.handle]

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
      {/* Breadcrumb + headline strip */}
      <div className="content-container pt-12 pb-6">
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

      {/* Editorial hero band — only on handles in `editorial` */}
      {story && (
        <div className="content-container">
          <div className="relative w-full aspect-[16/7] md:aspect-[16/6] rounded-[32px] overflow-hidden my-6">
            <Image
              src={story.heroImage}
              alt={story.heroAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"
            />
          </div>
        </div>
      )}

      {/* Ritual strip — a 3-up visual narrative (daily-foundation / targeted / stack) */}
      {story?.ritual && (
        <div className="content-container py-10">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-6">
            How it fits the day
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {story.ritual.map((r) => (
              <li
                key={r.title}
                className="flex flex-col gap-4 rounded-2xl overflow-hidden bg-ink/[0.03] p-5"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-bone">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 380px"
                    className="object-contain object-center p-4"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl text-ink">{r.title}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed mt-1.5">
                    {r.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product grid — constrained + labelled when editorial is active */}
      <div
        className={`flex flex-col small:flex-row small:items-start pb-16 content-container ${
          story ? "pt-8" : ""
        }`}
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <div className="w-full">
          {story && (
            <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-6">
              Shop the range
            </p>
          )}
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

      {/* Recipe teaser rail — 3 ways to use this category's product */}
      {story && (
        <div className="content-container py-16">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-2">
                Ways to use it
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.05] text-ink">
                Stir it into food you already cook.
              </h2>
            </div>
            <LocalizedClientLink
              href="/recipes"
              className="text-sm font-medium tracking-wide text-ink hover:text-cane transition-colors"
            >
              All recipes →
            </LocalizedClientLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recipes
              .filter(
                (r) =>
                  r.featuredProduct === "both" ||
                  r.featuredProduct === (category.handle as "essential" | "pro")
              )
              .slice(0, 3)
              .map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
          </div>
        </div>
      )}

      {/* FAQ — category-specific, 4 Q/As */}
      {story?.faq && (
        <div className="bg-ink text-bone py-20">
          <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.22em] text-culture/80 mb-3">
                Straight answers
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
                Questions
                <br />
                <span className="italic text-culture">we keep getting.</span>
              </h2>
            </div>
            <dl className="md:col-span-8 divide-y divide-bone/10">
              {story.faq.map((f) => (
                <div key={f.q} className="py-6 first:pt-0 last:pb-0">
                  <dt className="font-display text-xl text-bone">{f.q}</dt>
                  <dd className="text-bone/70 mt-2 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
