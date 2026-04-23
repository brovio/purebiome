import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * V3 final CTA. Huge number, single line, one button.
 * Reinforces the commodity-ification of the purchase — no FOMO, no urgency.
 */
export default function V3Cta() {
  return (
    <section className="bg-bone text-ink py-24 md:py-40">
      <div className="content-container flex flex-col items-center text-center gap-10">
        <p className="text-xs font-mono tracking-[0.22em] uppercase text-cane">
          A$49.95 / 30 serves / free over A$99
        </p>
        <h2 className="font-display text-6xl md:text-8xl leading-[0.95] max-w-4xl">
          Buy one tub.
          <br />
          <span className="italic text-cane">See what happens.</span>
        </h2>
        <LocalizedClientLink
          href="/products/essential-tub"
          className="inline-flex items-center gap-3 bg-ink text-bone px-12 py-6 text-xl font-medium tracking-wide hover:bg-cane transition-colors"
        >
          Add the tub to cart
          <span aria-hidden>→</span>
        </LocalizedClientLink>
        <p className="text-ink/60 text-sm max-w-md">
          No subscription. No referral pyramid. No "wellness ambassador"
          programme. Just the tub, the scoop, and thirty mornings.
        </p>
      </div>
    </section>
  )
}
