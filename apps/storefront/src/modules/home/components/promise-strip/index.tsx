/**
 * Thin stats strip directly under the hero. Four credibility pillars, no chrome.
 * Intentionally terse — the hero is emotional, this is the first proof point.
 */
const items = [
  { value: "12", label: "Live strains" },
  { value: "10B", label: "CFU per serve" },
  { value: "100%", label: "Australian made" },
  { value: "7s", label: "Daily ritual" },
]

export default function PromiseStrip() {
  return (
    <section className="bg-ink text-bone py-10 md:py-14">
      <div className="content-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-start md:items-center text-left md:text-center"
          >
            <span className="font-display text-4xl md:text-5xl text-bone">
              {item.value}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-bone/60 mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
