import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import HomeProductGrid from "@modules/home/components/product-grid"
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
      <HomeProductGrid region={region} countryCode={countryCode} />
    </>
  )
}
