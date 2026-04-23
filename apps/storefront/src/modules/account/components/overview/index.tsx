import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="flex flex-col gap-y-10">
      <div className="hidden small:flex justify-between items-end">
        <h1
          className="font-display text-4xl md:text-5xl text-ink leading-[1.05]"
          data-testid="welcome-message"
          data-value={customer?.first_name}
        >
          Hello, {customer?.first_name ?? "there"}.
        </h1>
        <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
          Signed in as:{" "}
          <span
            className="text-ink/80 normal-case tracking-normal"
            data-testid="customer-email"
            data-value={customer?.email}
          >
            {customer?.email}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="bg-ink/[0.03] border border-ink/10 rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-cane">
            Profile
          </h3>
          <div className="flex items-end gap-x-2">
            <span
              className="font-display text-5xl text-ink leading-none"
              data-testid="customer-profile-completion"
              data-value={getProfileCompletion(customer)}
            >
              {getProfileCompletion(customer)}%
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-ink/50 pb-1">
              complete
            </span>
          </div>
        </div>
        <div className="bg-ink/[0.03] border border-ink/10 rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.18em] text-cane">
            Addresses
          </h3>
          <div className="flex items-end gap-x-2">
            <span
              className="font-display text-5xl text-ink leading-none"
              data-testid="addresses-count"
              data-value={customer?.addresses?.length || 0}
            >
              {customer?.addresses?.length || 0}
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-ink/50 pb-1">
              saved
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <h2 className="font-display text-2xl text-ink">Recent orders</h2>
        <ul className="flex flex-col gap-y-3" data-testid="orders-wrapper">
          {orders && orders.length > 0 ? (
            orders.slice(0, 5).map((order) => (
              <li
                key={order.id}
                data-testid="order-wrapper"
                data-value={order.id}
              >
                <LocalizedClientLink
                  href={`/account/orders/details/${order.id}`}
                  className="block"
                >
                  <div className="bg-bone border border-ink/10 hover:border-cane/40 rounded-xl flex justify-between items-center p-4 transition-colors">
                    <div className="grid grid-cols-3 grid-rows-2 text-sm gap-x-4 flex-1">
                      <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
                        Date
                      </span>
                      <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
                        Order
                      </span>
                      <span className="text-xs uppercase tracking-[0.14em] text-ink/50">
                        Total
                      </span>
                      <span
                        data-testid="order-created-date"
                        className="text-ink"
                      >
                        {new Date(order.created_at).toDateString()}
                      </span>
                      <span
                        data-testid="order-id"
                        data-value={order.display_id}
                        className="text-ink"
                      >
                        #{order.display_id}
                      </span>
                      <span data-testid="order-amount" className="text-ink">
                        {convertToLocale({
                          amount: order.total,
                          currency_code: order.currency_code,
                        })}
                      </span>
                    </div>
                    <button
                      className="flex items-center justify-between text-cane"
                      data-testid="open-order-button"
                    >
                      <span className="sr-only">
                        Go to order #{order.display_id}
                      </span>
                      <ChevronDown className="-rotate-90" />
                    </button>
                  </div>
                </LocalizedClientLink>
              </li>
            ))
          ) : (
            <li
              data-testid="no-orders-message"
              className="text-ink/60 text-sm py-6 border border-dashed border-ink/15 rounded-xl text-center"
            >
              No orders yet. Start with the{" "}
              <LocalizedClientLink
                href="/products/essential-tub"
                className="underline decoration-cane/40 underline-offset-4 hover:text-cane"
              >
                Essential Tub
              </LocalizedClientLink>
              .
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
