import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * V3 hero. Blunt. No metaphor, no "ritual" language.
 * Big headline, one claim, one button. LMNT-adjacent.
 */
export default function V3Hero() {
  return (
    <section className="bg-culture text-ink min-h-[80vh] flex items-center">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center py-20">
        <div className="md:col-span-7 flex flex-col gap-8">
          <p className="text-sm font-mono tracking-[0.22em] uppercase">
            PureBiome / V3
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tight">
            It's prebiotic.
            <br />
            You drink it.
            <br />
            You feel different.
          </h1>
          <p className="text-xl md:text-2xl max-w-xl leading-snug">
            Twelve live strains. One daily scoop. Made in Brisbane. We don't
            have a wellness story.
          </p>
          <div>
            <LocalizedClientLink
              href="/products/essential-tub"
              className="inline-flex items-center gap-3 bg-ink text-culture px-10 py-5 text-lg font-medium tracking-wide hover:bg-cane transition-colors"
            >
              Buy the tub
              <span aria-hidden>→</span>
            </LocalizedClientLink>
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col items-center gap-6">
          <div className="relative w-full max-w-[440px] aspect-square bg-bone/60 rounded-2xl overflow-hidden">
            <Image
              src="/images/products/tub-neutral.webp"
              alt="PureBiome Essential Tub"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-contain object-center p-6"
            />
          </div>
          <div className="relative w-full max-w-[440px] aspect-[3/2] bg-bone/60 rounded-2xl overflow-hidden">
            <Image
              src="/images/products/sachets-neutral.webp"
              alt="PureBiome Essential Sachets"
              fill
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-contain object-center p-4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
