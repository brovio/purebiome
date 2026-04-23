import { Metadata } from "next"

import V3Hero from "@modules/home/v3/hero"
import V3Facts from "@modules/home/v3/facts"
import V3Cta from "@modules/home/v3/cta"
import { getRegion } from "@lib/data/regions"
import { notFound } from "next/navigation"

/**
 * V3 landing: blunt, direct-response variant.
 *
 * This exists alongside the V1 narrative at `/` so the marketing team can
 * A/B-test messaging without touching the default homepage. The two share
 * the global layout (nav / geobar / footer) and all Medusa cart / checkout
 * wiring — V3 just swaps the middle content.
 */
export const metadata: Metadata = {
  title: "PureBiome — a tub, a scoop, thirty mornings",
  description:
    "12 live strains. 10 billion CFU. One daily scoop of a Queensland-sugar-cane prebiotic. Australian-made. No subscription.",
}

export default async function V3({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)
  if (!region) return notFound()

  return (
    <>
      <V3Hero />
      <V3Facts />
      <V3Cta />
    </>
  )
}
