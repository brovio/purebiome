/**
 * Credentials / "the science" strip.
 * Not a deep dive — this is the reassurance moment before testimonials.
 * Four credibility anchors in a grid, each with a short one-liner.
 */
const credentials = [
  {
    tag: "MONASH",
    line: "Low FODMAP certified",
    detail:
      "Every batch tested and certified by Monash University's FODMAP program — no bloat from the thing meant to fix the bloat.",
  },
  {
    tag: "TGA",
    line: "Listed in the ARTG",
    detail:
      "Manufactured in a TGA-licensed Australian facility. Listing number on every tub.",
  },
  {
    tag: "RCT",
    line: "Evidence-backed strains",
    detail:
      "Every strain has at least one human randomised controlled trial behind it. No novel / unstudied organisms.",
  },
  {
    tag: "ISO",
    line: "Cold-chain tested",
    detail:
      "Stability tested from Brisbane to Darwin to London. 10 billion CFU arrives live — not just on the label.",
  },
]

export default function Science() {
  return (
    <section className="bg-ink text-bone py-24 md:py-32 border-t border-bone/5">
      <div className="content-container">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-culture mb-4">
            Credentials
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            Not a wellness story.
            <br />
            <span className="italic text-culture">A supply chain.</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((c) => (
            <li
              key={c.tag}
              className="border border-bone/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-culture/60 transition-colors"
            >
              <span className="text-xs font-mono tracking-[0.2em] text-culture">
                {c.tag}
              </span>
              <h3 className="font-display text-2xl">{c.line}</h3>
              <p className="text-bone/70 text-sm leading-relaxed">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
