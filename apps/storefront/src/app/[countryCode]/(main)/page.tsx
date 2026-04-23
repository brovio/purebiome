import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import PromiseStrip from "@modules/home/components/promise-strip"
import Problem from "@modules/home/components/problem"
import Formula from "@modules/home/components/formula"
import Ritual from "@modules/home/components/ritual"
import HomeProductGrid from "@modules/home/components/product-grid"
import Science from "@modules/home/components/science"
import Testimonials from "@modules/home/components/testimonials"
import Faq from "@modules/home/components/faq"
import FinalCta from "@modules/home/components/final-cta"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "PureBiome — daily prebiotic + live cultures",
  description:
    "One tub, one ingredient base: Australian sugar cane. Twelve living strains. Monash Low FODMAP certified, 100% Australian made.",
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
      <Hero />
      <PromiseStrip />
      <Problem />
      <Formula />
      <Ritual />
      <HomeProductGrid region={region} countryCode={countryCode} />
      <Science />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
