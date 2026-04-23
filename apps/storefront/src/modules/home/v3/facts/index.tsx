/**
 * V3 "facts sheet" — no storytelling, just claims with one-line proof.
 * Stacked rows, data-dense, monospace labels, big values.
 */
const rows = [
  {
    k: "STRAINS",
    v: "12 live",
    p: "Including L. rhamnosus GG, B. lactis HN019, L. plantarum 299v.",
  },
  {
    k: "CFU / SERVE",
    v: "10 billion",
    p: "At end-of-life, not at manufacture. Stability tested Brisbane → Darwin → London.",
  },
  {
    k: "PREBIOTIC",
    v: "Queensland cane",
    p: "Long-chain GOS extracted from Bundaberg sugar cane. Monash Low FODMAP.",
  },
  {
    k: "RITUAL",
    v: "5g, once daily",
    p: "One level scoop, any cold liquid, seven seconds. Not a routine; a reflex.",
  },
  {
    k: "GUARANTEE",
    v: "30-day, full refund",
    p: "Finish the tub, email hello@purebio.me, get your money back. No form.",
  },
]

export default function V3Facts() {
  return (
    <section className="bg-ink text-bone">
      <ul className="content-container divide-y divide-bone/10">
        {rows.map((r) => (
          <li
            key={r.k}
            className="grid grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-baseline"
          >
            <span className="col-span-12 md:col-span-2 text-xs font-mono tracking-[0.22em] text-culture">
              {r.k}
            </span>
            <span className="col-span-12 md:col-span-4 font-display text-4xl md:text-5xl leading-none">
              {r.v}
            </span>
            <span className="col-span-12 md:col-span-6 text-bone/70 text-base md:text-lg leading-relaxed">
              {r.p}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
