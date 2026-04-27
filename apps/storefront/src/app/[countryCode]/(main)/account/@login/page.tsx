// Last verified: 2026-04-26T22:56:19.973Z
import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your PureBiome account.",
}

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ countryCode: 'us' }]
}

export default function Login() {
  return <LoginTemplate />
}
