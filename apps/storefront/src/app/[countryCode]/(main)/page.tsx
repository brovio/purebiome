import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import PromiseStrip from "@modules/home/components/promise-strip"
import Problem from "@modules/home/components/problem"
import Formula from "@modules/home/components/formula"
import HowItWorks from "@modules/home/components/how-it-works"
import Ritual from "@modules/home/components/ritual"
import HomeProductGrid from "@modules/home/components/product-grid"
import Science from "@modules/home/components/science"
import Testimonials from "@modules/home/components/testimonials"
import Faq from "@modules/home/components/faq"
import FinalCta from "@modules/home/components/final-cta"
import HomeJsonLd from "./home-jsonld"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "PureBiome — Australian Prebiotic + Probiotic for Gut Health",
  description:
    "Clinically-studied prebiotic fibre from Australian sugarcane + 12 live probiotic strains. Monash Low FODMAP certified. Notice the difference in 3-5 days.",
  keywords: ["prebiotic Australia", "probiotic gut health", "Low FODMAP supplement", "digestive health", "gut microbiome", "Australian sugarcane fibre"],
  openGraph: {
    title: "PureBiome — Australian Prebiotic + Probiotic for Gut Health",
    description: "Clinically-studied prebiotic fibre from Australian sugarcane + 12 live probiotic strains. Monash Low FODMAP certified.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "PureBiome — Australian Prebiotic + Probiotic",
    description: "12 clinically-studied strains. Australian sugarcane prebiotic. Monash Low FODMAP certified.",
  },
  alternates: {
    canonical: "/au",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return []
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <HomeJsonLd />
      <Hero />
      <PromiseStrip />
      <Problem />
      <Formula />
      <HowItWorks />
      <Ritual />
      <HomeProductGrid region={region} countryCode={countryCode} />
      <Science />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
