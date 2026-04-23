/**
 * "How the ritual works" — three-step section.
 * Deliberately simple. One scoop, one glass, one swallow.
 * Shown on bone background for visual break between the dark Formula and
 * the dark Science sections.
 */
const steps = [
  {
    n: "01",
    title: "Scoop",
    body: "One level 5g scoop. Same time each morning, or whenever works — consistency matters more than the clock.",
  },
  {
    n: "02",
    title: "Stir",
    body: "Into water, a cold brew, or over your porridge. No blender, no shaker bottle, no ritual theatre.",
  },
  {
    n: "03",
    title: "Swallow",
    body: "Seven seconds. The prebiotic carries the strains intact past your stomach acid to where they actually work.",
  },
]

export default function Ritual() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="content-container">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
            The daily ritual
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05]">
            Seven seconds. Thirty mornings. One habit.
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="bg-ink text-bone p-8 md:p-10 rounded-2xl flex flex-col gap-4 hover:-translate-y-1 transition-transform"
            >
              <span className="font-display text-5xl text-culture">{s.n}</span>
              <h3 className="font-display text-3xl">{s.title}</h3>
              <p className="text-bone/75 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
