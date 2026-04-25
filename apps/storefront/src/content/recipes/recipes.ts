// Recipes — distilled from kfibre.brov.io/recipe-inspiration/ into
// eight ritual-recipe cards. Each one is a "how to stir PureBiome
// (née Kfibre) into food you already cook" prompt, not a full recipe.
// Source: https://kfibre.brov.io/recipe-inspiration/

export type Recipe = {
  slug: string
  title: string
  category: string
  eyebrow: string
  heroImage: string
  description: string
  serves: string
  prepTime: string
  difficulty: "Easy" | "Medium"
  ingredients: string[]
  steps: string[]
  featuredProduct: "essential" | "pro" | "both"
  tip?: string
  source: string
}

const SOURCE = "https://kfibre.brov.io/recipe-inspiration/"

export const recipes: Recipe[] = [
  {
    slug: "daily-smoothie",
    title: "Prebiotic smoothie",
    category: "Smoothies",
    eyebrow: "The 30-second breakfast",
    heroImage: "/images/recipes/lifestyle.jpg",
    description:
      "The fastest way to introduce a daily prebiotic — one teaspoon at the blender, no technique, no taste penalty. Start here.",
    serves: "1 serve",
    prepTime: "2 min",
    difficulty: "Easy",
    ingredients: [
      "1 teaspoon PureBiome Essential (Neutral or Berry)",
      "1 banana, frozen",
      "1 cup oat or dairy milk",
      "1 tablespoon nut butter",
      "Handful of frozen berries (optional)",
      "1 teaspoon honey (optional)",
    ],
    steps: [
      "Drop everything into the blender at once.",
      "Blitz for 45 seconds until smooth.",
      "Pour, drink. The prebiotic fibre disappears into the texture — you won't taste it.",
    ],
    tip: "Scale the PureBiome dose 1 teaspoon per person — works identically in any smoothie recipe you already love.",
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "winter-curry",
    title: "Curry, stew, or soup — added at the end",
    category: "Soups, stews & curries",
    eyebrow: "After the heat is off",
    heroImage: "/images/recipes/studio.png",
    description:
      "The one rule when cooking with a live-culture prebiotic: don't boil it. Heat wrecks the antioxidants. Stir it in after the pot comes off the burner — you get the flavour, the fibre, and all the gut benefits.",
    serves: "4 serves",
    prepTime: "10 min + recipe time",
    difficulty: "Easy",
    ingredients: [
      "1 teaspoon PureBiome Essential Neutral per person (4 teaspoons for 4 serves)",
      "Your existing curry / stew / soup recipe",
    ],
    steps: [
      "Cook your dish as normal — don't add PureBiome yet.",
      "Take the pot off the heat and let it cool for 2–3 minutes so it's warm, not boiling.",
      "Stir one level teaspoon of PureBiome Neutral per person through the pot.",
      "Serve. The fibre dissolves into the sauce without thickening it.",
    ],
    tip: "Neutral is the safe default for savoury cooking. Berry and Citrus work in sweet/cooking-fruit contexts (stewed apples, Moroccan tagines with orange).",
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "porridge-with-purebiome",
    title: "Porridge with a teaspoon",
    category: "Oats & porridge",
    eyebrow: "A warmer morning option",
    heroImage: "/images/recipes/tub-clean.png",
    description:
      "Same rule as curry — add PureBiome after the pot's off the heat. Adds a nutty-sweet backbone to oat porridge without making it grainy.",
    serves: "1 serve",
    prepTime: "6 min",
    difficulty: "Easy",
    ingredients: [
      "1/2 cup rolled oats",
      "1 cup milk (dairy or oat)",
      "Pinch of salt",
      "1 teaspoon PureBiome Essential (Neutral or Berry)",
      "Toppings: banana, maple syrup, cinnamon — your call",
    ],
    steps: [
      "Cook oats in milk on low heat, stirring until thickened (about 4 minutes).",
      "Kill the heat. Let the pot rest 1 minute.",
      "Stir in the teaspoon of PureBiome. Add a splash more milk if it's thickened too much — the prebiotic fibre absorbs moisture.",
      "Top, serve.",
    ],
    tip: "Works identically in rice porridge and rice pudding. Same 1 teaspoon per person, same add-at-the-end timing.",
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "water-and-juice",
    title: "The glass-of-water baseline",
    category: "Water & juice",
    eyebrow: "Minimum viable ritual",
    heroImage: "/images/recipes/sugarcane.svg",
    description:
      "No kitchen. No blender. One glass, one teaspoon, one stir. When the day's already sideways, this is the version of the ritual that still happens.",
    serves: "1 serve",
    prepTime: "30 seconds",
    difficulty: "Easy",
    ingredients: [
      "1 teaspoon PureBiome Essential (Berry or Citrus recommended)",
      "250 ml cold water or juice",
    ],
    steps: [
      "Pour the water or juice first.",
      "Add the teaspoon of PureBiome.",
      "Stir hard for 10 seconds — you want both the soluble and insoluble fibres suspended.",
      "Drink straight through, then chase with a half-glass of plain water to wash the throat.",
    ],
    tip: "Berry sachets live in laptop bags for this exact scenario. Same formula, no measuring.",
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "baking-ratio",
    title: "Baking — one tablespoon per cup",
    category: "Baking",
    eyebrow: "A quiet flour upgrade",
    heroImage: "/images/recipes/sachets.png",
    description:
      "The only baking rule: one tablespoon of PureBiome Neutral per cup of flour, added to the dry mix first. Works in gluten-free blends too. You'll need a touch more rising agent and wet ingredients — the fibre absorbs moisture.",
    serves: "Scales with recipe",
    prepTime: "1 min of setup",
    difficulty: "Easy",
    ingredients: [
      "1 tablespoon PureBiome Essential Neutral per cup of flour in the recipe",
      "Your existing baking recipe (cakes, muffins, bread, scones)",
    ],
    steps: [
      "Measure the flour as usual.",
      "Add PureBiome at a ratio of 1 Tbsp per 1 cup of flour. Whisk through the dry ingredients first — do this step before anything wet lands in the bowl.",
      "Add slightly more rising agent (10–15% more baking powder is a safe default) or slightly more wet ingredients to compensate for the fibre's moisture absorption.",
      "Mix, bake, done.",
    ],
    tip: "Apple crumble: 2 Tbsp into the crumble layer. Custard: 1 tsp per person added at the end, not during cooking.",
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "no-bake-treats",
    title: "Health balls & no-bake slices",
    category: "No-bake",
    eyebrow: "Snacks that earn their place",
    heroImage: "/images/recipes/lifestyle.jpg",
    description:
      "Health balls are the perfect vehicle — rolled, fridge-set, portable. 2 tablespoons of PureBiome into the dry mix and you've got a microbiome-fed snack that doesn't taste like homework.",
    serves: "12 balls",
    prepTime: "15 min + 30 min chill",
    difficulty: "Easy",
    ingredients: [
      "1 cup pitted dates",
      "1 cup rolled oats",
      "1/2 cup nut butter",
      "1/4 cup cocoa powder",
      "2 tablespoons PureBiome Essential Neutral",
      "1 tablespoon honey or maple syrup (optional)",
      "Pinch of sea salt",
    ],
    steps: [
      "Blitz the dates until they form a paste.",
      "Add the oats, nut butter, cocoa, PureBiome, and honey. Pulse until the mix holds together when pinched.",
      "If it's dry (PureBiome absorbs moisture), add a splash of oat milk or warm water, 1 tsp at a time.",
      "Roll into 12 tablespoon-sized balls.",
      "Chill 30 minutes. Store in the fridge for up to 5 days.",
    ],
    tip: "Cheesecake base: 1 Tbsp PureBiome into the biscuit crumb. Chocolate crackles: 1 heaped Tbsp into the dry mix, a touch more Copha to bind.",
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "mash-and-gravy",
    title: "Mash and gravy, quietly upgraded",
    category: "Mash & gravy",
    eyebrow: "The Sunday-roast version",
    heroImage: "/images/recipes/range-lineup.webp",
    description:
      "Mashed potato and gravy happily accept PureBiome without changing either dish. One teaspoon per serve into mash, one tablespoon into the gravy jug. Families don't notice.",
    serves: "4 serves",
    prepTime: "2 min setup",
    difficulty: "Easy",
    ingredients: [
      "For mash: 4 teaspoons PureBiome Essential Neutral + your usual mash",
      "For gravy: 1 tablespoon PureBiome Essential Neutral + your usual gravy",
      "Extra splash of milk + butter for mash; extra 2 Tbsp water for gravy",
    ],
    steps: [
      "Make the mash as normal. Stir in 1 teaspoon of PureBiome per person right at the end. Add a splash more milk and a knob more butter to keep the texture — the fibre absorbs moisture.",
      "For gravy: once the gravy's off the heat and slightly cooled, whisk in 1 Tbsp of PureBiome. Add a couple of tablespoons of warm water if it thickens too much.",
      "Serve. Nobody will ask what's different.",
    ],
    featuredProduct: "essential",
    source: SOURCE,
  },
  {
    slug: "dips-and-spreads",
    title: "Dips, hummus & spreads",
    category: "Dips",
    eyebrow: "Grazing-board trojan horse",
    heroImage: "/images/recipes/studio.png",
    description:
      "Any creamy dip — hummus, tzatziki, beetroot, whipped feta — takes 1 tablespoon of PureBiome Neutral per batch without a flavour penalty. Good way to dose guests who'd never willingly drink a prebiotic.",
    serves: "~1 cup dip",
    prepTime: "1 min",
    difficulty: "Easy",
    ingredients: [
      "1 tablespoon PureBiome Essential Neutral",
      "Your existing dip recipe",
      "1–2 tablespoons extra liquid (olive oil / lemon / water)",
    ],
    steps: [
      "Make the dip as normal, but stop before the final texture check.",
      "Stir (or blitz) in 1 Tbsp of PureBiome.",
      "Check texture — if it's stiffer than you want, loosen with a splash more olive oil, lemon juice, or water.",
      "Serve. Goes in a grazing board nobody interrogates.",
    ],
    featuredProduct: "essential",
    source: SOURCE,
  },
]
