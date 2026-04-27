// Last verified: 2026-04-26T22:56:19.973Z
import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Gut Health Quiz | PureBiome",
  description: "Find your perfect PureBiome product in 30 seconds. Personalised recommendations based on your gut health goals.",
}

const questions = [
  {
    id: 1,
    question: "What's your primary goal?",
    options: [
      { label: "Daily gut maintenance", value: "daily", product: "essential" },
      { label: "Reduce bloating after meals", value: "bloating", product: "calm" },
      { label: "Improve regularity", value: "regularity", product: "flow" },
    ],
  },
  {
    id: 2,
    question: "Where do you usually take supplements?",
    options: [
      { label: "At home, with breakfast", value: "home", product: "tub" },
      { label: "On the go, at work/gym", value: "travel", product: "sachets" },
      { label: "Both — I need flexibility", value: "both", product: "bundle" },
    ],
  },
  {
    id: 3,
    question: "Have you tried probiotics before?",
    options: [
      { label: "Yes, but didn't notice a difference", value: "tried-failed", product: "essential" },
      { label: "Yes, they worked but were expensive", value: "tried-expensive", product: "essential" },
      { label: "No, this would be my first", value: "new", product: "essential" },
    ],
  },
]

const recommendations: Record<string, { title: string; desc: string; href: string }> = {
  "daily-tub": {
    title: "Essential Tub — Neutral",
    desc: "Your daily ritual starts here. The 100g tub lives on your counter, ready for your morning coffee or smoothie.",
    href: "/products/essential-tub",
  },
  "daily-sachets": {
    title: "Essential Sachets — Mixed Pack",
    desc: "For the commute, the gym bag, the travel pouch. 14 sachets in Berry, Citrus, and Neutral.",
    href: "/products/essential-sachets",
  },
  "daily-bundle": {
    title: "The Complete Ritual Bundle",
    desc: "Tub for home, sachets for everywhere else. Most customers start here — you'll end up with both anyway.",
    href: "/products/essential-bundle",
  },
  "bloating-tub": {
    title: "Calm — Berry Tub",
    desc: "For dietary bloating and indigestion. The post-meal ritual that actually works.",
    href: "/products/calm",
  },
  "bloating-sachets": {
    title: "Calm — Berry Sachets",
    desc: "Keep these in your desk drawer. After lunch bloating, solved.",
    href: "/products/calm-sachets",
  },
  "regularity-tub": {
    title: "Flow — Citrus Tub",
    desc: "For regularity support. Citrus-forward, taken with breakfast and 2L of water.",
    href: "/products/flow",
  },
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ countryCode: 'us' }]
}

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-bone">
      {/* Header */}
      <div className="border-b border-ink/5">
        <div className="content-container py-6">
          <LocalizedClientLink href="/" className="text-ink font-display text-xl">
            PureBiome
          </LocalizedClientLink>
        </div>
      </div>

      <div className="content-container py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
              30-second quiz
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] mb-4">
              Find your <span className="italic text-cane">perfect</span> product
            </h1>
            <p className="text-ink/60 text-lg">
              Answer 3 quick questions. Get a personalised recommendation based on your gut health goals.
            </p>
          </div>

          {/* Quiz Form - Client Component would handle state, this is static for now */}
          <div className="space-y-8">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-ink/[0.02] border border-ink/5 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-cane/10 text-cane flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
                  <h3 className="font-display text-xl text-ink">{q.question}</h3>
                </div>
                
                <div className="space-y-3">
                  {q.options.map((opt) => (
                    <label 
                      key={opt.value}
                      className="flex items-center gap-4 p-4 rounded-xl border border-ink/10 hover:border-cane/30 hover:bg-cane/5 cursor-pointer transition-colors"
                    >
                      <input 
                        type="radio" 
                        name={`q-${q.id}`} 
                        value={opt.value}
                        className="w-5 h-5 accent-cane"
                      />
                      <span className="text-ink/80">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="pt-4">
              <button 
                className="w-full bg-ink text-bone py-4 rounded-full font-medium hover:bg-cane transition-colors"
                disabled
              >
                Get my recommendation →
              </button>
              <p className="text-center text-xs text-ink/40 mt-4">
                Interactive version coming soon. Browse all products below.
              </p>
            </div>
          </div>

          {/* Fallback product grid */}
          <div className="mt-16 pt-16 border-t border-ink/10">
            <h2 className="font-display text-2xl text-ink mb-8 text-center">
              Or browse all products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LocalizedClientLink 
                href="/categories/essential"
                className="p-6 rounded-2xl border border-ink/10 hover:border-cane/30 hover:bg-cane/5 transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-cane mb-2">Start here</p>
                <h3 className="font-display text-xl text-ink mb-2">Essential Range</h3>
                <p className="text-sm text-ink/60">Daily prebiotic + live cultures</p>
              </LocalizedClientLink>
              <LocalizedClientLink 
                href="/categories/pro"
                className="p-6 rounded-2xl border border-ink/10 hover:border-cane/30 hover:bg-cane/5 transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-cane mb-2">Targeted support</p>
                <h3 className="font-display text-xl text-ink mb-2">Pro Range</h3>
                <p className="text-sm text-ink/60">For bloating & regularity</p>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
