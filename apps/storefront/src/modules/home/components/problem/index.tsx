/**
 * "You've probably been here" — soft problem-statement section.
 * Goal: signal empathy without wellness-woo. Short paragraphs, serif pull quotes.
 */
export default function Problem() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
            Why you're reading this
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05]">
            You've tried the
            <br />
            podcast's favourite.
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-5 text-ink/80 text-lg leading-relaxed">
          <p>
            You've tried the pharmacy multi with the busy label. You've tried
            the boutique probiotic in the $60 glass jar. You still feel what
            you felt on Monday.
          </p>
          <p>
            The problem isn't you. Most gut products are built backwards —
            a handful of bacteria sprinkled over a cheap carrier that starves
            them before they get anywhere useful.
          </p>
          <p className="font-display italic text-2xl text-cane pt-4 border-l-2 border-cane/30 pl-6">
            We built PureBiome in the opposite direction: feed first, then
            seed.
          </p>
        </div>
      </div>
    </section>
  )
}
