import Image from "next/image"

/**
 * Formula / "what's actually in it" section.
 * Two-column: left is an educational breakdown of prebiotic + probiotic
 * rationale with the sugar-cane story, right is the tub photograph.
 * This is the most-read section on AG1-style landings; density matters here.
 */
const ingredients = [
  {
    title: "Australian sugar-cane prebiotic",
    detail:
      "Not a filler — the fuel. Extracted from Queensland sugar cane as a long-chain GOS fibre that reaches the large intestine intact and feeds beneficial bacteria already living there.",
  },
  {
    title: "Twelve live strains",
    detail:
      "Ten billion CFU per serve at end-of-life, not at manufacture. Includes L. rhamnosus GG, B. lactis HN019, L. plantarum 299v and nine others — each with human RCT evidence.",
  },
  {
    title: "Nothing else",
    detail:
      "No stevia, no rice maltodextrin, no added vitamins pretending to be features. If it's not feeding or seeding your microbiome, it's not in the tub.",
  },
]

export default function Formula() {
  return (
    <section className="bg-ink text-bone py-24 md:py-32">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Left: copy */}
        <div className="md:col-span-7 flex flex-col gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-culture mb-4">
              The formula
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              Built on Australian
              <br />
              <span className="italic text-culture">sugar cane.</span> That
              matters.
            </h2>
            <p className="text-bone/70 max-w-xl mt-6 text-lg leading-relaxed">
              Most probiotics ship live bacteria into a gut with nothing to eat.
              We grow the food source first — a long-chain prebiotic from
              Bundaberg cane — and pair it with strains that actually use it.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-bone/10">
            {ingredients.map((i, idx) => (
              <li key={i.title} className="py-6 first:pt-0 last:pb-0">
                <div className="flex gap-6">
                  <span className="font-display text-xl text-culture/80 w-8 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl text-bone">
                      {i.title}
                    </h3>
                    <p className="text-bone/70 leading-relaxed">{i.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: product image — tight framing, no empty-space halo */}
        <div className="md:col-span-5 md:sticky md:top-24 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden bg-culture/15">
            <Image
              src="/images/products/tub-berry.webp"
              alt="PureBiome Essential Tub, Berry"
              fill
              sizes="(max-width: 768px) 320px, 420px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
