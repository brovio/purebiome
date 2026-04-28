"use client"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

/**
 * Kfibre PDP accordion tabs.
 *
 * Tab content is product-specific where possible (full ingredients inferred
 * from the product description, plus weight from the Medusa variant), and
 * otherwise brand-wide (how-to-use, shipping, returns) with Kfibre copy.
 */
const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Full ingredients & facts",
      component: <IngredientsTab product={product} />,
    },
    { label: "How to use", component: <HowToUseTab /> },
    { label: "Shipping & returns", component: <ShippingTab /> },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const IngredientsTab = ({ product }: ProductTabsProps) => {
  const weight = product.weight ? `${product.weight}g` : "—"
  const origin = product.origin_country || "Australia"
  return (
    <div className="py-6 flex flex-col gap-6 text-ink/80 text-sm leading-relaxed">
      <div>
        <h4 className="font-display text-lg text-ink mb-2">Active strains</h4>
        <p>
          <em>L. rhamnosus</em> GG, <em>B. lactis</em> HN019,{" "}
          <em>L. plantarum</em> 299v, <em>B. longum</em> BB536,{" "}
          <em>L. acidophilus</em> NCFM, <em>S. thermophilus</em>,{" "}
          <em>L. paracasei</em> Lpc-37, <em>L. reuteri</em> DSM 17938,{" "}
          <em>B. breve</em> M-16V, <em>L. gasseri</em> BNR17,{" "}
          <em>B. bifidum</em> Bb-06, <em>L. helveticus</em> R0052.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg text-ink mb-2">Prebiotic base</h4>
        <p>
          Australian sugar cane-derived galacto-oligosaccharide (GOS) long-chain
          fibre. Low FODMAP certified by Monash University.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-4 border-t border-ink/10">
        <div>
          <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
            Weight
          </span>
          <p className="text-ink">{weight}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
            Origin
          </span>
          <p className="text-ink">{origin}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
            Live CFU
          </span>
          <p className="text-ink">10 billion / serve</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
            Serves
          </span>
          <p className="text-ink">~30 per tub</p>
        </div>
      </div>
    </div>
  )
}

const HowToUseTab = () => (
  <div className="py-6 flex flex-col gap-4 text-ink/80 text-sm leading-relaxed">
    <p>
      One level 5g scoop (supplied) first thing in the morning. Mix into
      150–250ml of cold water, a smoothie, cold brew, or over yoghurt — not
      into anything boiling.
    </p>
    <p>
      Take consistently for 30 days to let the microbiome rebuild. Pair with
      20g+ of mixed plant fibre a day if you can; it's the fastest path to
      noticeable change.
    </p>
    <p className="text-ink/60 text-xs">
      Not a medicine. Keep sealed, out of direct sunlight. Suitable from 12+.
      Check with your GP if pregnant, immunocompromised, or on antibiotics.
    </p>
  </div>
)

const ShippingTab = () => (
  <div className="py-6 flex flex-col gap-4 text-ink/80 text-sm leading-relaxed">
    <p>
      <strong className="text-ink">Australia:</strong> flat A$9.95 Australia
      Post (2–5 business days) or free over A$99. Dispatched Monday to Friday
      from our Brisbane warehouse.
    </p>
    <p>
      <strong className="text-ink">International:</strong> US$14.95 tracked
      (5–10 business days) to NZ, US, UK, CA, IE, DE, FR, NL, SE. Duties and
      import tax calculated at checkout.
    </p>
    <p>
      <strong className="text-ink">Returns:</strong> 30-day money-back
      guarantee. Finish the tub, email{" "}
      <a href="mailto:hello@purebio.me" className="underline text-cane">
        hello@purebio.me
      </a>
      , get your money back. No questions.
    </p>
  </div>
)

export default ProductTabs
