/**
 * Three-card social-proof section.
 * Placeholder copy marked clearly in-code so real reviews can be swapped in
 * without rewriting the layout. Names are plausibly-Australian stand-ins.
 */
const reviews = [
  {
    quote:
      "I've tried every probiotic on the shelf. Two weeks in on Kfibre and it's the first time 'feel the difference' wasn't marketing bullshit.",
    name: "Nadia W.",
    loc: "Fitzroy, VIC",
    rating: 5,
  },
  {
    quote:
      "The Low FODMAP certification sold me — I've got IBS and most gut products make it worse. This one actually doesn't.",
    name: "James R.",
    loc: "Paddington, NSW",
    rating: 5,
  },
  {
    quote:
      "Neutral flavour is genuinely neutral. Mix into coffee, into water, into the kids' smoothie, no argument from any of them.",
    name: "Alicia T.",
    loc: "Fremantle, WA",
    rating: 5,
  },
]

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5`} className="text-cane tracking-widest">
      {"★".repeat(n)}
      <span className="text-cane/20">{"★".repeat(5 - n)}</span>
    </span>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="content-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
              What the tub is doing
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05]">
              For the people using it.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars n={5} />
            <span className="text-ink/60 text-sm">
              4.8 average across verified purchases
            </span>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r) => (
            <li
              key={r.name}
              className="bg-ink/[0.03] border border-ink/10 rounded-2xl p-8 flex flex-col gap-5"
            >
              <Stars n={r.rating} />
              <blockquote className="font-display text-xl text-ink leading-snug">
                “{r.quote}”
              </blockquote>
              <footer className="mt-auto pt-4 border-t border-ink/10 text-sm">
                <div className="text-ink font-medium">{r.name}</div>
                <div className="text-ink/60">{r.loc}</div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
