import React from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 bg-bone" data-testid="account-page">
      <div className="flex-1 content-container max-w-6xl mx-auto flex flex-col">
        <div className="grid grid-cols-1 small:grid-cols-[260px_1fr] py-12 md:py-20 gap-x-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-start small:items-end justify-between small:border-t border-ink/10 py-12 gap-6">
          <div className="max-w-md">
            <h3 className="font-display text-2xl text-ink mb-3">
              Something off?
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              A real human reads every email to{" "}
              <a
                href="mailto:hello@purebio.me"
                className="underline decoration-cane/40 underline-offset-4 hover:text-cane"
              >
                hello@purebio.me
              </a>{" "}
              — usually back within 4 business hours.
            </p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 bg-ink text-bone px-5 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-cane transition-colors"
          >
            Shop the range
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
