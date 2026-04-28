"use client"

import { useState } from "react"

/**
 * FAQ accordion. Client component because it needs open/closed state.
 * Intentionally only 6 questions — the ones that actually block a purchase.
 */
const qs = [
  {
    q: "How is this different from the probiotic I already take?",
    a: "Most probiotics ship live bacteria with nothing for them to eat. Stomach acid kills a large fraction before they reach the colon. We pair 12 live strains with a long-chain Australian sugar-cane prebiotic that reaches the large intestine intact — feeding both the strains we send and the bacteria already living there.",
  },
  {
    q: "Is it Low FODMAP?",
    a: "Yes. Every batch is tested and certified by Monash University's FODMAP program. If you've got IBS, IBD or sensitivity — this is built for you.",
  },
  {
    q: "When will I notice a difference?",
    a: "Most customers report noticeable differences in regularity and bloating within 10–14 days. The microbiome rebuilds slowly — we recommend committing to a single 30-day tub before evaluating.",
  },
  {
    q: "Do I need to refrigerate it?",
    a: "No. The strains are shelf-stable through patented freeze-drying, tested from Brisbane to Darwin to London. Keep the tub sealed and out of direct sun — that's it.",
  },
  {
    q: "Can I take it while pregnant or breastfeeding?",
    a: "All strains in Kfibre have published safety data in pregnancy. We still recommend checking with your GP before starting anything new — standard medical advice, not a cop-out.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "30-day money-back guarantee, no questions. Finish the tub, email us, get a refund. We'd rather you tried it properly than bought again out of guilt.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="content-container grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
            Questions
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05]">
            Before you buy.
          </h2>
          <p className="text-ink/70 mt-6 leading-relaxed">
            If we haven't answered it here, email{" "}
            <a
              href="mailto:hello@purebio.me"
              className="underline decoration-cane/40 underline-offset-4 hover:text-cane"
            >
              hello@purebio.me
            </a>{" "}
            — a real human replies, usually within 4 business hours.
          </p>
        </div>

        <ul className="md:col-span-8 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {qs.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left hover:text-cane transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl text-ink">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`text-2xl leading-none text-cane transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-10 text-ink/75 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
