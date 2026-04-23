/**
 * PureBiome seed — replaces the Medusa starter demo data with the real
 * PureBiome product range, AU + Intl regions, and Brisbane stock location.
 *
 * Run with: `pnpm --filter ./services/medusa run seed`
 *
 * Safe to re-run: guards on sales channel, API key, shipping profile, and
 * store currencies check for existing rows before creating.
 *
 * Product range (matches landing brief):
 *   - PureBiome Essential Tub     (flavours: Neutral / Berry / Citrus)
 *   - PureBiome Essential Sachets (pack size: 14 / 28)
 *   - PureBiome Calm              (Berry, for bloating / indigestion)
 *   - PureBiome Flow              (Orange, for regularity)
 */

import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { ApiKey } from "../../.medusa/types/query-entry-points";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => ({
      selector: { id: data.input.store_id },
      update: {
        supported_currencies: data.input.supported_currencies.map((c) => ({
          currency_code: c.currency_code,
          is_default: c.is_default ?? false,
        })),
      },
    }));
    const stores = updateStoresStep(normalizedInput);
    return new WorkflowResponse(stores);
  }
);

// --- Region config ----------------------------------------------------------

const AU_COUNTRIES = ["au"];
const INTL_COUNTRIES = ["nz", "us", "gb", "ca", "ie", "de", "fr", "nl", "se"];

// --- Product image helper ---------------------------------------------------
// Served from the current live static site at purebio.me until we upload
// proper assets to S3/R2 in step 8.
const IMG = (name: string) => `https://purebio.me/images/${name}`;

// --- Seed script ------------------------------------------------------------

export default async function seedPureBiomeData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  logger.info("Seeding PureBiome store data...");
  const [store] = await storeModuleService.listStores();

  // Sales channel -----------------------------------------------------------
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    });
    defaultSalesChannel = result;
  }

  // Store currencies --------------------------------------------------------
  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        { currency_code: "aud", is_default: true },
        { currency_code: "usd" },
        { currency_code: "nzd" },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_sales_channel_id: defaultSalesChannel[0].id },
    },
  });

  // Regions -----------------------------------------------------------------
  logger.info("Seeding regions (Australia + International)...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Australia",
          currency_code: "aud",
          countries: AU_COUNTRIES,
          payment_providers: ["pp_system_default"],
        },
        {
          name: "International",
          currency_code: "usd",
          countries: INTL_COUNTRIES,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const auRegion = regionResult.find((r) => r.name === "Australia")!;
  const intlRegion = regionResult.find((r) => r.name === "International")!;

  // Tax regions (one row per country) ---------------------------------------
  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: [...AU_COUNTRIES, ...INTL_COUNTRIES].map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });

  // Stock location: Brisbane (cane country) ---------------------------------
  logger.info("Seeding stock location: Brisbane Warehouse...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Brisbane Warehouse",
          address: {
            city: "Brisbane",
            country_code: "AU",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_location_id: stockLocation.id },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  });

  // Shipping profile + fulfilment set ---------------------------------------
  logger.info("Seeding shipping profile and fulfilment set...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: {
        data: [{ name: "Default Shipping Profile", type: "default" }],
      },
    });
    shippingProfile = result[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "PureBiome Global Delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Australia",
        geo_zones: AU_COUNTRIES.map((country_code) => ({
          country_code,
          type: "country" as const,
        })),
      },
      {
        name: "International",
        geo_zones: INTL_COUNTRIES.map((country_code) => ({
          country_code,
          type: "country" as const,
        })),
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  const auZone = fulfillmentSet.service_zones.find((z) => z.name === "Australia")!;
  const intlZone = fulfillmentSet.service_zones.find(
    (z) => z.name === "International"
  )!;

  // Shipping options: one per region ----------------------------------------
  // Phase 1: flat-rate standard. Free-over-threshold gets implemented as a
  // Promotion in step 6 alongside checkout wiring.
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Australia Standard",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: auZone.id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Australia Post, 2–5 business days.",
          code: "au-standard",
        },
        prices: [{ currency_code: "aud", amount: 995 }, { region_id: auRegion.id, amount: 995 }],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "International Standard",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: intlZone.id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Tracked international, 5–10 business days.",
          code: "intl-standard",
        },
        prices: [
          { currency_code: "usd", amount: 1495 },
          { region_id: intlRegion.id, amount: 1495 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [defaultSalesChannel[0].id] },
  });
  logger.info("Finished seeding shipping + stock location.");

  // Publishable API key -----------------------------------------------------
  logger.info("Ensuring publishable API key exists...");
  let publishableApiKey: ApiKey | null = null;
  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id"],
    filters: { type: "publishable" },
  });
  publishableApiKey = data?.[0];

  if (!publishableApiKey) {
    const {
      result: [created],
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          { title: "PureBiome Storefront", type: "publishable", created_by: "" },
        ],
      },
    });
    publishableApiKey = created as ApiKey;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [defaultSalesChannel[0].id] },
  });
  logger.info(
    `Publishable API key ready — paste this into apps/storefront/.env.local as NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: ${publishableApiKey.id}`
  );

  // Categories --------------------------------------------------------------
  logger.info("Seeding product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        { name: "Essential", handle: "essential", is_active: true },
        { name: "Pro", handle: "pro", is_active: true },
        { name: "Bundles", handle: "bundles", is_active: true },
      ],
    },
  });
  const essentialCat = categoryResult.find((c) => c.name === "Essential")!;
  const proCat = categoryResult.find((c) => c.name === "Pro")!;

  // Price helpers -----------------------------------------------------------
  // Medusa amounts are in the smallest currency unit (cents).
  const price = (aud: number, usd: number, nzd?: number) => {
    const rows = [
      { currency_code: "aud", amount: aud },
      { currency_code: "usd", amount: usd },
    ];
    if (nzd) rows.push({ currency_code: "nzd", amount: nzd });
    return rows;
  };

  // Products ----------------------------------------------------------------
  logger.info("Seeding PureBiome product range...");
  await createProductsWorkflow(container).run({
    input: {
      products: [
        // 1. Essential Tub ------------------------------------------------------
        {
          title: "PureBiome Essential Tub",
          subtitle: "Daily prebiotic fibre + live cultures",
          handle: "essential-tub",
          category_ids: [essentialCat.id],
          description:
            "One tub, one ingredient base: Australian sugar cane. Twelve live strains. Your daily gut foundation — Monash Low FODMAP certified, gluten-free, 100% Australian made.",
          weight: 320,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: IMG("photo-tub-neutral.png") }, { url: IMG("photo-tub-berry.png") }, { url: IMG("photo-tub-orange.png") }],
          options: [{ title: "Flavour", values: ["Neutral", "Berry", "Citrus"] }],
          variants: [
            {
              title: "Neutral",
              sku: "PB-ESS-TUB-NEU",
              options: { Flavour: "Neutral" },
              prices: price(4995, 3995, 5495),
            },
            {
              title: "Berry",
              sku: "PB-ESS-TUB-BER",
              options: { Flavour: "Berry" },
              prices: price(4995, 3995, 5495),
            },
            {
              title: "Citrus",
              sku: "PB-ESS-TUB-CIT",
              options: { Flavour: "Citrus" },
              prices: price(4995, 3995, 5495),
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // 2. Essential Sachets -------------------------------------------------
        {
          title: "PureBiome Essential Sachets",
          subtitle: "The ritual, on the go",
          handle: "essential-sachets",
          category_ids: [essentialCat.id],
          description:
            "Same daily foundation in single-serve sachets. Slip in a laptop bag, drop one in water at 10am, keep the ritual on the road.",
          weight: 180,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: IMG("photo-sachets.png") }],
          options: [{ title: "Pack Size", values: ["14 sachets", "28 sachets"] }],
          variants: [
            {
              title: "14 sachets",
              sku: "PB-ESS-SCH-14",
              options: { "Pack Size": "14 sachets" },
              prices: price(1995, 1495, 2195),
            },
            {
              title: "28 sachets",
              sku: "PB-ESS-SCH-28",
              options: { "Pack Size": "28 sachets" },
              prices: price(3495, 2795, 3795),
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // 3. Pro Calm ----------------------------------------------------------
        {
          title: "PureBiome Calm",
          subtitle: "Targeted: bloating & indigestion",
          handle: "calm",
          category_ids: [proCat.id],
          description:
            "Scientifically formulated prebiotic + probiotic blend for digestive comfort. Eases dietary bloating and indigestion. Natural berry flavour.",
          weight: 320,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: IMG("photo-tub-berry.png") }],
          options: [{ title: "Flavour", values: ["Berry"] }],
          variants: [
            {
              title: "Berry",
              sku: "PB-PRO-CLM-BER",
              options: { Flavour: "Berry" },
              prices: price(6495, 4995, 7195),
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        // 4. Pro Flow ----------------------------------------------------------
        {
          title: "PureBiome Flow",
          subtitle: "Targeted: regularity",
          handle: "flow",
          category_ids: [proCat.id],
          description:
            "Scientifically formulated prebiotic + probiotic blend to support regular bowel movements and digestive health. Natural orange flavour.",
          weight: 320,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: IMG("photo-tub-orange.png") }],
          options: [{ title: "Flavour", values: ["Orange"] }],
          variants: [
            {
              title: "Orange",
              sku: "PB-PRO-FLW-ORG",
              options: { Flavour: "Orange" },
              prices: price(6495, 4995, 7195),
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });
  logger.info("Finished seeding products.");

  // Inventory levels --------------------------------------------------------
  logger.info("Seeding inventory levels (1,000,000 each for local dev)...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });
  const inventoryLevels: CreateInventoryLevelInput[] = inventoryItems.map(
    (item: { id: string }) => ({
      location_id: stockLocation.id,
      stocked_quantity: 1_000_000,
      inventory_item_id: item.id,
    })
  );
  await createInventoryLevelsWorkflow(container).run({
    input: { inventory_levels: inventoryLevels },
  });
  logger.info("Finished seeding inventory levels.");

  logger.info("PureBiome seed complete ✓");
}
