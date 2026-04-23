import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/**
 * PureBiome Medusa configuration.
 *
 * - Payment: Stripe provider loads only when STRIPE_API_KEY is present.
 *   Keeps local dev usable without real keys (falls back to the built-in
 *   system/manual provider for test orders).
 * - Redis: configure RedisCache / RedisEventBus / RedisWorkflow modules
 *   when REDIS_URL is set in production. For local dev we fall through
 *   to the built-in in-memory defaults.
 */

const hasStripe = !!process.env.STRIPE_API_KEY
const hasRedis = !!process.env.REDIS_URL && process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    redisUrl: hasRedis ? process.env.REDIS_URL : undefined,
  },
  modules: [
    ...(hasStripe
      ? [
          {
            resolve: "@medusajs/medusa/payment",
            options: {
              providers: [
                {
                  resolve: "@medusajs/payment-stripe",
                  id: "stripe",
                  options: {
                    apiKey: process.env.STRIPE_API_KEY,
                    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
                    capture: true,
                  },
                },
              ],
            },
          },
        ]
      : []),
    ...(hasRedis
      ? [
          {
            resolve: "@medusajs/medusa/cache-redis",
            options: { redisUrl: process.env.REDIS_URL },
          },
          {
            resolve: "@medusajs/medusa/event-bus-redis",
            options: { redisUrl: process.env.REDIS_URL },
          },
          {
            resolve: "@medusajs/medusa/workflow-engine-redis",
            options: {
              redis: { url: process.env.REDIS_URL },
            },
          },
        ]
      : []),
  ],
})
