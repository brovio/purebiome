import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { recipes } from "../../../../../../content/recipes/recipes"

type Params = { countryCode: string; slug: string }

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const recipe = recipes.find((r) => r.slug === slug)
  if (!recipe) return {}
  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [recipe.heroImage],
      type: "article",
    },
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const recipe = recipes.find((r) => r.slug === slug)
  if (!recipe) notFound()

  // Recipe JSON-LD for SEO — schema.org/Recipe.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    recipeCategory: recipe.category,
    recipeCuisine: "Australian",
    prepTime: recipe.prepTime,
    recipeYield: recipe.serves,
    image: [recipe.heroImage],
    author: { "@type": "Organization", name: "PureBiome" },
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  }

  const idx = recipes.findIndex((r) => r.slug === slug)
  const next = recipes[(idx + 1) % recipes.length]

  return (
    <article className="bg-bone">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="content-container pt-12 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="text-xs uppercase tracking-[0.18em] text-ink/50 flex gap-2"
        >
          <LocalizedClientLink
            href="/recipes"
            className="hover:text-cane transition-colors"
          >
            Recipes
          </LocalizedClientLink>
          <span aria-hidden className="text-ink/30">
            /
          </span>
          <span className="text-ink/80 line-clamp-1">{recipe.category}</span>
        </nav>
      </div>

      {/* Title block */}
      <div className="content-container pb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-3">
          {recipe.eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-ink leading-[1.02] max-w-4xl">
          {recipe.title}
        </h1>
        <p className="text-lg md:text-xl text-ink/70 mt-6 max-w-2xl leading-relaxed">
          {recipe.description}
        </p>

        {/* Meta row */}
        <dl className="grid grid-cols-3 gap-4 md:gap-8 mt-8 max-w-xl text-sm">
          <div className="border-l-2 border-cane pl-4">
            <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">
              Serves
            </dt>
            <dd className="font-display text-xl text-ink mt-1">
              {recipe.serves}
            </dd>
          </div>
          <div className="border-l-2 border-cane pl-4">
            <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">
              Prep
            </dt>
            <dd className="font-display text-xl text-ink mt-1">
              {recipe.prepTime}
            </dd>
          </div>
          <div className="border-l-2 border-cane pl-4">
            <dt className="text-xs uppercase tracking-[0.18em] text-ink/55">
              Level
            </dt>
            <dd className="font-display text-xl text-ink mt-1">
              {recipe.difficulty}
            </dd>
          </div>
        </dl>
      </div>

      {/* Two-column: sticky sidebar image + ingredients, main column steps */}
      <div className="content-container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Sidebar: hero image + ingredient list (sticky on md+) */}
          <aside className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden bg-culture/10">
              <Image
                src={recipe.heroImage}
                alt={recipe.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
                Ingredients
              </p>
              <ul className="flex flex-col divide-y divide-ink/10">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="py-3 text-ink/85 leading-relaxed flex gap-4"
                  >
                    <span className="font-display text-sm text-cane/80 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main: numbered steps */}
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-6">
              Method
            </p>
            <ol className="flex flex-col gap-8">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="font-display text-4xl text-cane/70 w-12 shrink-0 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink/85 leading-[1.7] text-[17px] pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {recipe.tip && (
              <div className="mt-12 p-6 rounded-2xl bg-culture/30 border-l-4 border-cane">
                <p className="text-xs uppercase tracking-[0.22em] text-ink/60 mb-2">
                  Pro tip
                </p>
                <p className="text-ink/85 leading-relaxed">{recipe.tip}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="content-container pb-12">
        <div className="max-w-2xl mx-auto border-t border-ink/10 pt-8">
          <p className="text-sm text-ink/60 leading-relaxed">
            Adapted from the usage notes at{" "}
            <a
              href={recipe.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cane hover:text-ink transition-colors underline"
            >
              kfibre.brov.io/recipe-inspiration
            </a>
            . PureBiome Essential uses the same Australian sugar-cane
            prebiotic as Kfibre — ratios transfer 1:1.
          </p>
        </div>
      </div>

      {/* Next recipe teaser */}
      <div className="bg-ink text-bone py-16">
        <div className="content-container max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.22em] text-culture/80 mb-4">
            Next in the rotation
          </p>
          <LocalizedClientLink
            href={`/recipes/${next.slug}`}
            className="group inline-flex items-baseline gap-4"
          >
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] group-hover:text-culture transition-colors">
              {next.title}
            </h2>
            <span
              aria-hidden
              className="text-2xl group-hover:text-culture transition-colors"
            >
              →
            </span>
          </LocalizedClientLink>
          <p className="text-bone/70 mt-4 max-w-xl">{next.description}</p>
        </div>
      </div>
    </article>
  )
}
