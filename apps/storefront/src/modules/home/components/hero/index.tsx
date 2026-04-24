import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * PureBiome homepage hero.
 * Left: headline + subhead + primary CTA + trust markers.
 * Right: product photograph (Essential Tub, Neutral) served locally from /images/products.
 * Copy direction matches the AG1-inspired V1 landing brief.
 */
const Hero = () => {
  return (
    <section className="relative w-full bg-bone overflow-hidden">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center py-20 md:py-28">
        {/* Copy */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80">
            Daily prebiotic · live cultures · Australian made
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-ink">
            Your gut,
            <br />
            <span className="italic text-cane">rebuilt</span> daily.
          </h1>
          <p className="max-w-lg text-lg text-ink/75 leading-relaxed">
            One tub. One ingredient base: Australian sugar cane. Twelve living
            strains. A single ritual you already have time for — because it
            takes seven seconds.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LocalizedClientLink
              href="/products/essential-tub"
              className="inline-flex items-center gap-2 bg-ink text-bone px-7 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-cane transition-colors"
            >
              Start the ritual
              <span aria-hidden>→</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-ink/80 hover:text-cane px-4 py-4 text-sm font-medium tracking-wide transition-colors"
            >
              View the range
            </LocalizedClientLink>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs uppercase tracking-[0.14em] text-ink/60">
            <li>Monash Low FODMAP certified</li>
            <li aria-hidden className="text-ink/20">
              ·
            </li>
            <li>Gluten &amp; dairy free</li>
            <li aria-hidden className="text-ink/20">
              ·
            </li>
            <li>100% Australian</li>
          </ul>
        </div>

        {/* Range lineup — the full family, not a single tub */}
        <div className="md:col-span-7 relative">
          <div
            aria-hidden
            className="absolute -inset-x-8 -inset-y-12 bg-culture/25 blur-3xl -z-10 rounded-[60%]"
          />
          <div className="relative w-full aspect-[5/4] rounded-[48px] overflow-hidden bg-bone shadow-[0_40px_80px_-30px_rgba(28,28,28,0.25)]">
            <Image
              src="/images/products/range-lineup.webp"
              alt="The PureBiome range — Essential Tub, Sachets, Calm, and Flow lined up together"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center"
            />
          </div>
          <p className="absolute bottom-4 left-6 text-xs uppercase tracking-[0.22em] text-ink/55 bg-bone/80 backdrop-blur px-3 py-1.5 rounded-full">
            The range · Essential + Pro
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
