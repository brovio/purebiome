/**
 * HowItWorks - 3-step visual guide
 * Inspired by AG1 and Seed's onboarding patterns
 */

// Inline SVG icons (no external dependency)
const ScoopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M9 3v6m0 0v6m0-6h6m-6 0H3m6 12c3 0 6-2 6-6V9M9 3c-3 0-6 2-6 6v6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const StirIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M12 2v20M8 6c4-2 8 0 8 4s-4 6-8 4" />
    <circle cx="12" cy="22" r="1" fill="currentColor" />
  </svg>
)

const FeelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" />
    <circle cx="12" cy="16" r="4" />
  </svg>
)

const steps = [
  {
    number: "01",
    title: "Scoop",
    description: "One teaspoon into your morning coffee, smoothie, or water. No blender required.",
    Icon: ScoopIcon,
    time: "3 seconds",
  },
  {
    number: "02",
    title: "Stir",
    description: "Dissolves completely. No clumps. No grit. Neutral hides in anything.",
    Icon: StirIcon,
    time: "4 seconds",
  },
  {
    number: "03",
    title: "Feel",
    description: "Notice the difference in 3-5 days. Regular, comfortable digestion becomes your new normal.",
    Icon: FeelIcon,
    time: "Every day",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative bg-culture/5 py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cane/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-culture/20 rounded-full blur-3xl" />
      </div>
      
      <div className="content-container relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-cane/80 mb-4">
            The ritual
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
            How it <span className="italic text-cane">works</span>
          </h2>
          <p className="text-ink/60 mt-4 text-lg">
            Seven seconds. That&apos;s all it takes to change your gut health trajectory.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, idx) => (
            <div 
              key={step.number}
              className="relative group"
            >
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-cane/30 to-transparent" />
              )}
              
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-bone/50 backdrop-blur-sm border border-ink/5 hover:border-cane/20 transition-colors">
                {/* Number & Icon */}
                <div className="relative mb-6">
                  <span className="font-display text-7xl text-cane/10 absolute -top-4 left-1/2 -translate-x-1/2">
                    {step.number}
                  </span>
                  <div className="relative w-16 h-16 rounded-full bg-cane/10 flex items-center justify-center text-cane">
                    <step.Icon />
                  </div>
                </div>
                
                {/* Time badge */}
                <span className="text-xs uppercase tracking-[0.14em] text-cane/70 mb-3">
                  {step.time}
                </span>
                
                {/* Content */}
                <h3 className="font-display text-2xl text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-ink/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-ink/50 text-sm mb-4">
            Not sure which format is right for you?
          </p>
          <a 
            href="/quiz" 
            className="inline-flex items-center gap-2 text-cane hover:text-ink transition-colors font-medium"
          >
            Take the 30-second quiz
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
