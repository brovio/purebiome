import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * TrustBadge - visual trust indicator with icon
 */
const TrustBadge = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-xs text-ink/70">
    <span className="text-cane">{icon}</span>
    <span className="font-medium">{children}</span>
  </div>
)

/**
 * PureBiome homepage hero - Variant A: Science Authority
 * Enhanced with trust badges, clearer value prop, quiz CTA
 */
const Hero = () => {
  return (
    <section className="relative w-full bg-bone overflow-hidden">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center py-20 md:py-28">
        {/* Copy */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80">
            Australian prebiotics · Clinical results
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-ink">
            Your gut,
            <br />
            <span className="italic text-cane">rebuilt</span> daily.
          </h1>
          <p className="max-w-lg text-lg text-ink/75 leading-relaxed">
            12 clinically-studied strains. 10 billion CFU at end-of-life. 
            One 7-second ritual backed by Australian sugarcane science.
          </p>
          
          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 pt-2">
            <LocalizedClientLink
              href="/products/essential-tub"
              className="inline-flex items-center gap-2 bg-ink text-bone px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-cane transition-colors shadow-lg shadow-ink/10"
            >
              Start with Essential
              <span aria-hidden>→</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/quiz"
              className="inline-flex items-center gap-2 border border-ink/20 text-ink px-6 py-4 rounded-full text-sm font-medium hover:bg-ink hover:text-bone transition-colors"
            >
              <span>Take the quiz</span>
              <span className="text-xs text-ink/50">(30 sec)</span>
            </LocalizedClientLink>
          </div>
          
          {/* Trust Badge Bar - NEW */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 pb-2 border-t border-ink/10 mt-4">
            <TrustBadge icon="✓">Monash Low FODMAP®</TrustBadge>
            <TrustBadge icon="✓">TGA Listed</TrustBadge>
            <TrustBadge icon="✓">Australian Made</TrustBadge>
            <TrustBadge icon="✓">Gluten Free</TrustBadge>
          </div>
          
          {/* Social proof micro-bar */}
          <p className="text-xs text-ink/50">
            <span className="text-cane font-semibold">50,000+</span> Australians started their ritual this year
          </p>
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
