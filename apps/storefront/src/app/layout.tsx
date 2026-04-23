import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "@purebiome/tokens/tokens.css"
import "styles/globals.css"

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const fontDisplay = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "opsz"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "PureBiome — daily prebiotic + live cultures",
    template: "%s · PureBiome",
  },
  description:
    "One daily ritual. Twelve living strains. Australian sugar cane, re-sourced for your microbiome.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      data-theme="light"
      className={`${fontBody.variable} ${fontDisplay.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="skip-link bg-ink text-bone px-4 py-2 rounded-full text-sm font-medium"
        >
          Skip to content
        </a>
        <main id="main-content" className="relative">
          {props.children}
        </main>
      </body>
    </html>
  )
}
