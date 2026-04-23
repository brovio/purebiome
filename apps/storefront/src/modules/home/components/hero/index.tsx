import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * PureBiome homepage hero.
 * Left: headline + subhead + primary CTA + trust markers.
 * Right: product photograph (Essential Tub, Neutral) served from purebio.me/images.
 * Copy direction matches the AG1-inspired V1 landing brief.
 */
const Hero = () => {
  return (
    <section className="relative w-full bg-bone overflow-hidden">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center py-20 md:py-32">
        {/* Copy */}
        <div className="md:col-span-6 flex flex-col gap-8">
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

        {/* Product image */}
        <div className="md:col-span-6 relative flex justify-center md:justify-end">
          <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-culture/40 blur-3xl -z-10"
            />
            <Image
              src="https://purebio.me/images/photo-tub-neutral.png"
              alt="PureBiome Essential Tub"
              fill
              priority
              sizes="(max-width: 768px) 320px, 480px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
