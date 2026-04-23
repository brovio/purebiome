#!/usr/bin/env node
/**
 * Morning sanity check. Pings every piece of the PureBiome dev stack and
 * prints a table. Safe to run any time; read-only.
 *
 *   pnpm status
 */

const endpoints = [
  { name: "Postgres (via Medusa /store/regions)", url: "http://localhost:9000/store/regions" },
  { name: "Medusa admin health", url: "http://localhost:9000/health" },
  { name: "Storefront home (AU)", url: "http://localhost:8000/au" },
  { name: "Storefront PDP", url: "http://localhost:8000/au/products/essential-tub" },
  { name: "Storefront V3", url: "http://localhost:8000/au/v3" },
  { name: "Storefront sitemap", url: "http://localhost:8000/sitemap.xml" },
  { name: "Storefront robots", url: "http://localhost:8000/robots.txt" },
]

const MEDUSA_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

const results = []
for (const ep of endpoints) {
  const started = Date.now()
  try {
    const headers = ep.url.includes("localhost:9000/store")
      ? { "x-publishable-api-key": MEDUSA_KEY }
      : {}
    const res = await fetch(ep.url, { headers, redirect: "manual" })
    results.push({
      name: ep.name,
      status: res.status,
      ok: res.status >= 200 && res.status < 400,
      ms: Date.now() - started,
    })
  } catch (err) {
    results.push({
      name: ep.name,
      status: "ECONN",
      ok: false,
      ms: Date.now() - started,
      error: err instanceof Error ? err.message : String(err),
    })
  }
}

const colWidth = Math.max(...results.map((r) => r.name.length))
const pad = (s, n) => s + " ".repeat(Math.max(0, n - s.length))

console.log("\nPureBiome stack status")
console.log("=".repeat(colWidth + 20))
for (const r of results) {
  const mark = r.ok ? "✓" : "✗"
  const color = r.ok ? "\x1b[32m" : "\x1b[31m"
  console.log(
    `${color}${mark}\x1b[0m ${pad(r.name, colWidth)}  ${String(r.status).padStart(5)}  ${String(r.ms).padStart(4)}ms${r.error ? " — " + r.error : ""}`
  )
}
console.log()

const failed = results.filter((r) => !r.ok)
if (failed.length) {
  console.error(`${failed.length} of ${results.length} checks failed.`)
  console.error(
    "Tips: `pnpm infra:up` to bring up postgres + redis; `pnpm dev` to start Medusa + storefront."
  )
  process.exit(1)
}

console.log(`All ${results.length} checks passed.\n`)
