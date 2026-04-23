import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * Closing CTA band. Visually the loudest thing on the page.
 * Culture-green background, display type, single dominant CTA.
 */
export default function FinalCta() {
  return (
    <section className="bg-culture text-ink">
      <div className="content-container py-24 md:py-32 flex flex-col items-center text-center gap-8">
        <p className="text-xs uppercase tracking-[0.22em] text-ink/70">
          One tub. Thirty mornings.
        </p>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl">
          Start the ritual
          <br />
          <span className="italic">tomorrow morning.</span>
        </h2>
        <p className="max-w-xl text-ink/75 text-lg leading-relaxed">
          Free delivery in Australia over A$99. 30-day money-back guarantee. No
          subscription auto-trap — you buy when you need the next tub.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <LocalizedClientLink
            href="/products/essential-tub"
            className="inline-flex items-center gap-2 bg-ink text-bone px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-cane transition-colors"
          >
            Buy the Essential Tub
            <span aria-hidden>→</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 border border-ink/30 text-ink px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-ink hover:text-bone transition-colors"
          >
            See the range
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
