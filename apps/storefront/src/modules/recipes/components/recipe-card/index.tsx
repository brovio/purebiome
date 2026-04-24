import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { Recipe } from "../../../../../content/recipes/recipes"

/**
 * Recipe index card. Used on /recipes grid and as the 3-up teaser rail
 * on category pages (essential, pro). Portrait 4/5 aspect to sit tightly
 * next to the blog post cards (which are 4/3) without looking identical.
 */
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <LocalizedClientLink
      href={`/recipes/${recipe.slug}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-culture/10">
        <Image
          src={recipe.heroImage}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
        />
        <p className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.22em] text-bone/90 bg-ink/40 backdrop-blur px-2.5 py-1 rounded-full">
          {recipe.category}
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink/55">
        <span>{recipe.prepTime}</span>
        <span aria-hidden>·</span>
        <span>{recipe.serves}</span>
      </div>
      <h3 className="font-display text-2xl leading-[1.15] text-ink group-hover:text-cane transition-colors">
        {recipe.title}
      </h3>
      <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
        {recipe.description}
      </p>
    </LocalizedClientLink>
  )
}
