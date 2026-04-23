import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-6 flex flex-col-reverse small:flex-col gap-y-8">
      <div className="w-full bg-ink/[0.03] border border-ink/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        <h2 className="font-display text-3xl text-ink">In your cart</h2>
        <ItemsPreviewTemplate cart={cart} />
        <div className="border-t border-ink/10 pt-6">
          <CartTotals totals={cart} />
        </div>
        <div className="border-t border-ink/10 pt-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
