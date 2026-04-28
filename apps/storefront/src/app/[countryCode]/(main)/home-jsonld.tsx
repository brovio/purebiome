/**
 * GEO-optimized structured data for homepage
 * Designed for AI search engines (ChatGPT, Perplexity, Google SGE)
 * Includes Organization, WebSite, and HowTo schemas
 */

import { getBaseURL } from "@lib/util/env"

export default function HomeJsonLd() {
  const base = getBaseURL().replace(/\/$/, "")

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kfibre",
    alternateName: "Kfibre",
    url: base,
    logo: `${base}/images/products/range-lineup.webp`,
    description: "Australian prebiotic and probiotic supplements for gut health. Monash Low FODMAP certified.",
    sameAs: [
      "https://kfibre.com",
      "https://kfibre.brov.io",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
      addressRegion: "Queensland",
    },
    brand: {
      "@type": "Brand",
      name: "Kfibre",
      description: "Prebiotic fibre from Australian sugarcane combined with 12 clinically-studied probiotic strains.",
    },
    knowsAbout: [
      "Gut microbiome health",
      "Prebiotic supplements",
      "Probiotic strains",
      "Low FODMAP diet",
      "Digestive health",
      "Australian sugarcane fibre",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kfibre",
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to take Kfibre for gut health",
    description: "A simple 7-second daily ritual to improve your gut microbiome health with Australian prebiotics and probiotics.",
    totalTime: "PT7S",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "AUD",
      value: "0.80",
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: "Kfibre Essential Tub or Sachets",
      },
      {
        "@type": "HowToSupply",
        name: "Morning beverage (coffee, smoothie, or water)",
      },
    ],
    tool: {
      "@type": "HowToTool",
      name: "Teaspoon",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Scoop",
        text: "Add one teaspoon of Kfibre to your morning coffee, smoothie, or water. No blender required.",
        url: `${base}/au#how-it-works`,
        image: `${base}/images/products/tub-neutral.webp`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Stir",
        text: "Stir for 4 seconds until fully dissolved. No clumps, no grit. The neutral formula hides in any beverage.",
        url: `${base}/au#how-it-works`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Feel",
        text: "Continue daily for 3-5 days. Notice improved digestion, reduced bloating, and more regular bowel movements.",
        url: `${base}/au#how-it-works`,
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Kfibre and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kfibre is an Australian-made prebiotic and probiotic supplement that combines sugarcane-derived prebiotic fibre with 12 clinically-studied probiotic strains. The prebiotic feeds beneficial gut bacteria while the probiotics add live cultures that survive stomach acid to reach your intestines.",
        },
      },
      {
        "@type": "Question",
        name: "Is Kfibre Low FODMAP certified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Kfibre is Monash University Low FODMAP certified. The long-chain prebiotic fibre from Australian sugarcane feeds your microbiome without fermenting aggressively in the gut, making it suitable for people with IBS and sensitive digestion.",
        },
      },
      {
        "@type": "Question",
        name: "How long until I notice results from Kfibre?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people notice improvements in digestion within 3-5 days of daily use. For significant microbiome changes, expect 2-3 weeks of consistent use. Everyone's gut is different, but our 10 billion CFU end-of-life guarantee ensures you're getting live cultures with every scoop.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between Kfibre Essential and Pro ranges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Essential is our daily maintenance formula with prebiotic fibre + probiotics for general gut health. Pro range includes targeted formulas: Calm (Berry) for bloating and indigestion, and Flow (Citrus) for regularity support. Both use the same 12-strain foundation with added botanicals for specific concerns.",
        },
      },
    ],
  }

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Kfibre Gut Health Supplements",
    description: "Australian prebiotic and probiotic supplements for digestive health and microbiome support.",
    about: {
      "@type": "MedicalCondition",
      name: "Gut Dysbiosis",
      alternateName: ["Poor gut health", "Digestive issues"],
    },
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
      healthCondition: {
        "@type": "MedicalCondition",
        name: "Digestive Health",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "Monash University",
      description: "Low FODMAP certification",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
    </>
  )
}
