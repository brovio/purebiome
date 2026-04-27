// Last verified: 2026-04-26T22:56:19.973Z
import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import GeoBar from "@modules/layout/components/geo-bar"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  let customer = null
  let cart = null
  let shippingOptions: StoreCartShippingOption[] = []

  try {
    ;[customer, cart] = await Promise.all([
      retrieveCustomer(),
      retrieveCart(),
    ])

    if (cart) {
      const { shipping_options } = await listCartOptions()
      shippingOptions = shipping_options
    }
  } catch (error) {
    // Backend unavailable — render layout without cart/customer data
  }

  return (
    <>
      <GeoBar countryCode={countryCode} />
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </>
  )
}
