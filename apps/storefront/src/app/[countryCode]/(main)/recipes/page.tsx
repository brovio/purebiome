// Last verified: 2026-04-26T22:56:19.973Z
import { Metadata } from "next"
import RecipeCard from "@modules/recipes/components/recipe-card"
import { recipes } from "../../../../content/recipes/recipes"

export const metadata: Metadata = {
  title: "Ritual recipes — cooking with PureBiome",
  description:
    "Eight ways to stir PureBiome Essential into food you already make. No new recipes to learn — just a teaspoon at the right moment.",
}


export default function RecipesIndexPage() {
  return (
    <div className="bg-bone">
      {/* Page header */}
      <div className="content-container pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-3">
          Ritual recipes
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-ink leading-[1.05]">
          Stir it in.
        </h1>
        <p className="text-ink/70 mt-4 max-w-xl leading-relaxed">
          PureBiome isn't a new recipe — it's a half-teaspoon step you add
          to food you already cook. Eight low-effort prompts below. One
          rule: never boil it.
        </p>
      </div>

      {/* Grid */}
      <div className="content-container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}
