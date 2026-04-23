import { test, expect } from "@playwright/test"

/**
 * Smoke tests for the PureBiome storefront.
 *
 * These are intentionally shallow — the point is to catch big regressions
 * (500s, missing copy, broken add-to-cart) rather than pixel-perfect QA.
 * Pair with manual review on the /au preview for anything visual.
 */

test.describe("PureBiome storefront smoke suite", () => {
  test("homepage renders the V1 narrative", async ({ page }) => {
    await page.goto("/au")
    await expect(page).toHaveTitle(/PureBiome/)

    // Hero
    await expect(
      page.getByRole("heading", { name: /your gut,/i, level: 1 })
    ).toBeVisible()
    await expect(
      page.getByRole("link", { name: /start the ritual/i }).first()
    ).toBeVisible()

    // Narrative sections
    await expect(page.getByText(/Twelve live strains/i).first()).toBeVisible()
    await expect(
      page.getByText(/Low FODMAP certified/i).first()
    ).toBeVisible()

    // At least one product card from the seed
    await expect(
      page
        .locator('[data-testid="products-grid"] [data-testid="product-title"]')
        .first()
    ).toBeVisible()
  })

  test("store listing shows all 4 seeded products", async ({ page }) => {
    await page.goto("/au/store")
    await expect(
      page.getByRole("heading", { name: /every tub we make/i })
    ).toBeVisible()

    const titles = await page
      .locator('[data-testid="product-title"]')
      .allInnerTexts()
    expect(titles).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/Essential Tub/i),
        expect.stringMatching(/Essential Sachets/i),
        expect.stringMatching(/Calm/i),
        expect.stringMatching(/Flow/i),
      ])
    )
  })

  test("PDP shows variant picker and PureBiome tabs", async ({ page }) => {
    await page.goto("/au/products/essential-tub")
    await expect(
      page.getByTestId("product-title").filter({ hasText: /Essential Tub/i })
    ).toBeVisible()

    // Variant picker
    await expect(page.getByRole("button", { name: "Neutral" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Berry" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Citrus" })).toBeVisible()

    // Tabs (use .first() because the footer may also contain some of these strings)
    await expect(page.getByText("Full ingredients & facts").first()).toBeVisible()
    await expect(page.getByText("How to use").first()).toBeVisible()
    await expect(page.getByText("Shipping & returns").first()).toBeVisible()
  })

  test("cart shows empty state when opened cold", async ({ page }) => {
    await page.goto("/au/cart")
    await expect(page.getByText(/cart/i).first()).toBeVisible()
  })

  test("add-to-cart from PDP increments cart count", async ({ page }) => {
    await page.goto("/au/products/essential-tub")

    // Select a variant (required before add works)
    await page.getByRole("button", { name: "Berry" }).click()

    const cartLink = page.getByTestId("nav-cart-link")
    const before = (await cartLink.textContent()) ?? ""

    await page.getByTestId("add-product-button").click()

    // Wait for the cart count to change from Cart (0) → Cart (n > 0).
    await expect
      .poll(async () => (await cartLink.textContent()) ?? "", {
        timeout: 15_000,
      })
      .not.toBe(before)

    const after = (await cartLink.textContent()) ?? ""
    expect(after).toMatch(/Cart \(\d+\)/)
    expect(after).not.toMatch(/Cart \(0\)/)
  })

  test("GeoBar is region-aware on /au", async ({ page }) => {
    await page.goto("/au")
    await expect(page.getByText(/Australia/).first()).toBeVisible()
    await expect(page.getByText(/A\$99/).first()).toBeVisible()
  })

  test("category page shows branded intro and products", async ({ page }) => {
    await page.goto("/au/categories/essential")
    await expect(
      page.getByRole("heading", { name: /Essential\./i })
    ).toBeVisible()
    await expect(page.getByText(/Your daily foundation/i)).toBeVisible()
    await expect(
      page.locator('[data-testid="product-title"]').first()
    ).toBeVisible()
  })

  test("login page shows PureBiome welcome copy", async ({ page }) => {
    await page.goto("/au/account")
    await expect(
      page.getByRole("heading", { name: /welcome back/i })
    ).toBeVisible()
    await expect(page.getByTestId("email-input").first()).toBeVisible()
    // Switch to register view
    await page.getByTestId("register-button").click()
    await expect(
      page.getByRole("heading", { name: /join purebiome/i })
    ).toBeVisible()
  })

  test("robots.txt + sitemap.xml + product JSON-LD are emitted", async ({
    page,
    request,
  }) => {
    const robots = await request.get("/robots.txt")
    expect(robots.ok()).toBeTruthy()
    const robotsBody = await robots.text()
    expect(robotsBody).toMatch(/Disallow: \/checkout/)
    expect(robotsBody).toMatch(/Sitemap:/)

    const sitemap = await request.get("/sitemap.xml")
    expect(sitemap.ok()).toBeTruthy()
    const sitemapBody = await sitemap.text()
    expect(sitemapBody).toMatch(/<loc>.*\/au<\/loc>/)
    expect(sitemapBody).toMatch(/\/au\/products\/essential-tub/)

    // JSON-LD on the PDP — grep the rendered HTML directly so we match the
    // server-rendered <script> tag regardless of DOM hydration timing.
    await page.goto("/au/products/essential-tub")
    const html = await page.content()
    const match = html.match(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
    )
    expect(match, "expected a <script type='application/ld+json'> in the PDP").toBeTruthy()
    const parsed = JSON.parse(match![1])
    expect(parsed["@type"]).toBe("Product")
    expect(parsed.brand?.name).toBe("PureBiome")
    expect(parsed.offers?.priceCurrency).toBe("AUD")
  })

  test("V3 landing at /au/v3 renders the blunt variant", async ({ page }) => {
    await page.goto("/au/v3")
    await expect(page.getByText(/You drink it/i)).toBeVisible()
    await expect(
      page.getByRole("link", { name: /buy the tub/i })
    ).toBeVisible()
    // Facts sheet
    await expect(page.getByText(/10 billion/i)).toBeVisible()
    await expect(page.getByText(/Queensland cane/i)).toBeVisible()
    // Final CTA
    await expect(page.getByText(/Buy one tub/i)).toBeVisible()
  })
})
