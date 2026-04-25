# PureBiome UX Audit & Competitive Analysis
## Audit Date: April 25, 2026
## Comparison Brands: AG1, Seed Health, Ritual, LMNT

---

## 1. CURRENT PUREBIOME STATE ANALYSIS

### What's Working ✅
- Clean, minimal design aesthetic (bone/ink color palette)
- Fast performance (Turbopack, Next.js 15)
- Good content foundation (blog, recipes integrated)
- Proper technical SEO (sitemap, JSON-LD)
- Editorial category pages with ritual strips
- High-res product images now in place

### Critical Issues 🔴

#### 1.1 Messaging & Positioning
| Issue | Current | Competitor Standard |
|-------|---------|-------------------|
| Hero headline | "Your gut, rebuilt daily." | Too vague |
| Value prop | "One tub. One ingredient." | Feature-focused, not benefit |
| Trust signals | "Monash Low FODMAP" only | Missing: clinical trials, doctors, press |
| Scientific credibility | Weak | AG1 has 4 clinical trials visible |
| Social proof | None visible | AG1/Seed have testimonials above fold |

#### 1.2 Visual Design Gaps
| Element | Current | Seed/AG1 Standard |
|---------|---------|-------------------|
| Product photography | Isolated on white/bone | Lifestyle context shots missing |
| Typography hierarchy | Flat | Needs more dramatic scale contrast |
| Animation/Motion | Static | AG1 has micro-interactions everywhere |
| Color energy | Muted/moody | Needs moments of vibrancy |
| Iconography | None | Seed has beautiful microbiome illustrations |

#### 1.3 UX Flow Issues
- No quiz/assessment (Seed has "Take the Quiz")
- No bundling/upsell visibility
- Missing "How it works" 3-step visual
- No comparison tool vs competitors
- Cart/checkout flow not optimized for conversion

---

## 2. COMPETITIVE DEEP-DIVE

### AG1 (Athletic Greens) - $1B+ valuation
**Positioning:** "Nutrition insurance for ambitious people"

**Key Patterns:**
- Hero: Product + powder splash in motion
- Trust: "15 years of research in every scoop" + 4 clinical trial badges
- Social proof: Athletes + doctors carousel immediately visible
- Science: Dedicated research page with study PDFs
- Quiz: "Is AG1 right for you?" flow
- Subtle animations: Product floating, powder swirling
- Guarantee: 60-day money back (prominent)

**What to Steal:**
1. "Research first" messaging hierarchy
2. Clinical trial badges/certifications
3. Motion design on hero product
4. Athlete/doctor testimonial grid
5. Quiz conversion flow

### Seed Health - Probiotic category leader
**Positioning:** "Whole body health starts in the gut"

**Key Patterns:**
- Hero: Cinematic capsule-in-capsule animation
- Science: ViaCap® technology visualization
- Products: Clean grid with clear subscription pricing
- Education: Extensive "Science" section
- Quiz: "Is DS-01 right for you?" with personalized results
- Community: @seed on Instagram feed integration
- Transparency: Full ingredient lists with sourcing

**What to Steal:**
1. "Can change your life" emotional hook
2. Capsule technology visualization
3. Clean product grid layout
4. Ingredient transparency page
5. Personalization quiz

### Ritual - Clean traceable vitamins
**Positioning:** "Supplements that actually work"

**Key Patterns:**
- Hero: Transparent capsule close-up (their USP)
- Traceability: "See where ingredients come from" map
- Science: University-led clinical studies cited
- Design: Stunning product photography with refraction
- Simplicity: 3-step "How it works"

**What to Steal:**
1. Traceability/transparency storytelling
2. Capsule refraction photography
3. Clean "how it works" steps
4. Ingredient sourcing visualization

### LMNT - Zero-sugar electrolytes
**Positioning:** "More salt, not less" (counter-intuitive claim)

**Key Patterns:**
- Hero: Bold typographic headline
- Contrarian: Challenges FDA guidance directly
- Science: JAMA study citation immediately visible
- Flavor-forward: Color-coded flavor system
- Community: Strong podcast/athlete partnerships

**What to Steal:**
1. Counter-intuitive, memorable headline
2. Immediate scientific citation
3. Color-coded flavor differentiation
4. Bold, unapologetic tone

---

## 3. VARIANT A: "The Science Authority" (Seed-inspired)

### Strategy
Position PureBiome as the most clinically credible option through:
- Prominent scientific credentials
- Trust badge wall above fold
- Ingredient traceability
- Research citations

### Design Changes
```
HERO SECTION REDESIGN:
- Keep bone/ink palette
- Add: 4 trust badges row under CTA:
  [Monash Low FODMAP] [TGA Listed] [Australian Made] [Clinically Studied]
- Subtle animated particles (microbiome abstract visual)
- Product image: Tub with sugarcane field background context

NEW "SCIENCE" STRIP (below hero):
| 12 Live Strains | 10B CFU End-of-Life | Australian Sugarcane |
|---------------|---------------------|---------------------|
| (illustration) | (illustration)      | (illustration)      |

HOW IT WORKS (3 steps):
1. FUEL [icon] → 2. FEED [icon] → 3. FLOURISH [icon]
```

### Copy Changes
```diff
- "Your gut, rebuilt daily."
+ "Australian prebiotics. Clinical results."

- "One tub. One ingredient base: Australian sugar cane."
+ "12 strains. 10 billion CFU. One daily ritual backed by science."
```

---

## 4. VARIANT B: "The Daily Ritual" (AG1-inspired)

### Strategy
Focus on the ritual/habit formation and lifestyle integration:
- Morning routine positioning
- Lifestyle photography
- Athlete/wellness expert testimonials
- "7 seconds" convenience messaging

### Design Changes
```
HERO SECTION:
- Split layout: Morning routine video/photo on left
- Product on counter with coffee cup
- Tagline: "The 7-second morning habit that changes everything"

TESTIMONIAL CAROUSEL (new section):
| "Finally regular without the bloat" — Sarah M. | 5 stars |
| "My doctor actually asked what I changed" — Mark T. | 5 stars |

LIFESTYLE GRID:
- Gym bag with sachets
- Kitchen counter with smoothie
- Office desk with water bottle
- Travel pouch
```

### Copy Changes
```diffn- "Your gut, rebuilt daily."
+ "The morning habit that actually works."

- "One tub. One ingredient base"
+ "7 seconds. Better digestion. Better mornings."
```

---

## 5. VARIANT C: "The Contrarian" (LMNT-inspired)

### Strategy
Challenge conventional gut health wisdom:
- "Prebiotics > Probiotics alone" angle
- "Not another greens powder"
- Direct competitor comparison
- Bold, confident tone

### Design Changes
```
HERO:
- Striking headline typography
- Black background option for contrast
- Single powerful claim: "Prebiotics that actually reach your gut"

COMPARISON TABLE (new):
                    | PureBiome | Greens Powders | Generic Probiotics |
Prebiotic fiber     | ✓ ✓ ✓     | ✓              | ✗                  |
Live cultures       | ✓ 12 strains | ✗         | ✓ (often dead)     |
Low FODMAP certified| ✓         | ?              | ?                  |
No sugar added      | ✓         | ✗              | ✓                  |

"WHY MOST PROBIOTICS FAIL" (content section):
- Educational content about survivability
- Visual of stomach acid killing generic probiotics
- PureBiome's delivery mechanism advantage
```

### Copy Changes
```diff
- "Your gut, rebuilt daily."
+ "Most probiotics die before they help you."

- "Twelve live strains"
+ "12 strains that actually survive your stomach acid."
```

---

## 6. QUICK WINS (Implement Tonight)

### 6.1 Trust Badge Bar (30 min)
Add below hero CTA:
```tsx
<div className="flex flex-wrap gap-4 justify-center mt-8">
  <Badge icon="shield">Monash Low FODMAP</Badge>
  <Badge icon="flask">TGA Listed</Badge>
  <Badge icon="map-pin">Australian Made</Badge>
</div>
```

### 6.2 Social Proof Section (45 min)
Add between hero and formula:
```tsx
<section className="py-16 bg-bone">
  <div className="content-container">
    <p className="text-center text-xs uppercase tracking-[0.22em] text-cane mb-8">
      Trusted by 50,000+ Australians
    </p>
    <TestimonialCarousel />
  </div>
</section>
```

### 6.3 How It Works 3-Step (60 min)
Add after formula section:
```tsx
<section className="py-20 bg-culture/10">
  <div className="content-container">
    <h2 className="font-display text-4xl text-center mb-12">How it works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Step number="1" title="Scoop" desc="One teaspoon into any drink" />
      <Step number="2" title="Stir" desc="Dissolves in 7 seconds" />
      <Step number="3" title="Feel" desc="Notice the difference in 3-5 days" />
    </div>
  </div>
</section>
```

### 6.4 Quiz CTA (30 min)
Add to nav + hero secondary CTA:
```tsx
<Button variant="outline" href="/quiz">
  Take the 30-second gut health quiz →
</Button>
```

---

## 7. CONTENT IMPROVEMENTS NEEDED

### 7.1 Product Descriptions
Current: "Berry flavoured prebiotic for your Microbiome..."

Improved:
```
Essential Tub — Berry
Made with real berry extract. No artificial sweeteners. 
The same 12-strain formula, now in a flavor you'll actually look forward to.

Perfect for: People who drink their supplements with water
```

### 7.2 Category Page Copy
Current: "Daily prebiotic ritual · Essential"

Improved:
```
The Essential Range
Start here. Our original formula — Australian sugarcane prebiotic + 
12 live probiotic strains. Low FODMAP certified. No sugar added.

Choose your format: Tub for home. Sachets for everywhere else.
```

### 7.3 Recipe Content
Current: "The 30-second breakfast"

Improved:
```
The Can't-Taste-It Smoothie
Add PureBiome to your existing smoothie. No flavor change. 
No texture change. Just better gut health in the breakfast you already love.
```

---

## 8. VISUAL ASSETS NEEDED

### 8.1 Immediate (can create/source)
- [ ] Trust badge icons (Monash, TGA, Australian Made)
- [ ] 3-step "How it works" illustrations
- [ ] 5 customer testimonial portraits (stock with attribution)
- [ ] Microbiome abstract pattern (subtle background)

### 8.2 Photo Shoot Needed
- [ ] Lifestyle: Tub on bathroom counter with morning light
- [ ] Lifestyle: Sachet being torn open over water bottle
- [ ] Lifestyle: Smoothie prep with PureBiome tub visible
- [ ] Detail: Scoop with powder texture close-up
- [ ] Packaging: Unboxing sequence
- [ ] Context: Australian sugarcane field (stock)

### 8.3 Competitive Response
- [ ] "Not a greens powder" comparison graphic
- [ ] Survivability visualization (stomach acid → intestine)
- [ ] Strain breakdown infographic

---

## 9. TECHNICAL IMPROVEMENTS

### 9.1 Performance
- [ ] Add @vercel/speed-insights
- [ ] Implement Intersection Observer for lazy animations
- [ ] Preload hero product image

### 9.2 Conversion
- [ ] Add Klaviyo/attentive email capture popup
- [ ] Exit-intent offer (15% off first order)
- [ ] Sticky add-to-cart on scroll (product pages)
- [ ] Free shipping progress bar ("Add $23 more for free shipping")

### 9.3 Analytics
- [ ] Enhanced ecommerce tracking
- [ ] Scroll depth tracking
- [ ] Quiz completion funnel
- [ ] A/B test framework (Vercel Edge Config)

---

## 10. RECOMMENDED PRIORITY

### Week 1 (Immediate Impact)
1. ✅ Trust badge bar on hero
2. ✅ "How it works" 3-step section
3. ✅ Testimonial carousel
4. ✅ Quiz CTA + basic quiz page
5. ✅ Improved product descriptions

### Week 2 (Content & Trust)
6. Science page with clinical citations
7. Ingredient transparency section
8. Comparison vs greens powders
9. Recipe content improvement
10. Lifestyle photography sourcing

### Week 3 (Optimization)
11. Email capture implementation
12. Exit-intent modal
13. Cart abandonment flow
14. A/B testing setup
15. Performance optimizations

---

## NEXT STEPS

1. Choose which variant direction resonates (Science / Ritual / Contrarian)
2. Implement Quick Wins tonight
3. Begin Week 1 priorities tomorrow
4. Source/produce visual assets
5. User testing with 5 target customers

---

*Document created for Bedtime Pass review - April 25, 2026*
