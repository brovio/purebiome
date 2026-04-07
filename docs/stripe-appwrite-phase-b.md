# Stripe Checkout Session via Appwrite (phase B / C)

Phase A uses **Stripe Payment Links** configured in [`main.js`](../main.js) (`PUREBIO.stripePaymentLinkAu`, `PUREBIO.stripePaymentLinkIntl`). When you need dynamic line items, UTMs in Stripe metadata, or **embedded Checkout** inside the modal, add an **Appwrite Function** that calls the Stripe API with your secret key (stored in Appwrite as a secret).

## Phase B: redirect Checkout

1. Create a function (Node 18+) with dependency `stripe`.
2. Environment: `STRIPE_SECRET_KEY`, optional `STRIPE_PRICE_STARTER_AU`, `STRIPE_PRICE_STARTER_INTL`.
3. Handler: parse JSON body `{ region: "au" | "intl", successUrl, cancelUrl }`, read UTMs from body or pass from the client’s `sessionStorage`.
4. Call `stripe.checkout.sessions.create({ mode: "payment", line_items: [...], success_url, cancel_url, metadata: { ...utm } })`.
5. Return `{ url: session.url }` to the browser.
6. In `main.js`, replace the Payment Link redirect with `fetch()` to your Appwrite Function endpoint, then `window.location.href = data.url`.

## Phase C: embedded Checkout (modal)

1. Same session creation, but set `ui_mode: "embedded"` and return `client_secret` from the session.
2. Load Stripe.js on the marketing page and mount [embedded Checkout](https://docs.stripe.com/checkout/embedded) inside the modal container instead of redirecting.
3. Listen for completion events and close the modal on success.

## Security

- Never expose `STRIPE_SECRET_KEY` in static HTML or client-only repos.
- Restrict the Appwrite Function to authenticated invocations or signed payloads if the endpoint is public.

## References

- [Stripe Checkout Session API](https://stripe.com/docs/api/checkout/sessions/create)
- [Appwrite Functions](https://appwrite.io/docs/products/functions)
