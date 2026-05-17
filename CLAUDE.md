# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-file TypeScript library providing a typed, comprehensive reference of all Stripe test card numbers. Intended to be imported directly into test suites that use Stripe's sandbox/test API keys.

## Commands

```bash
npm run build      # compile to dist/ (ESM + CJS + .d.ts) via tsup
npm run typecheck  # tsc type-check without emitting
npm publish        # publish to npm (run build first)
```

## Structure

The entire library lives in `stripe-test-cards.ts`. There are no dependencies, no build step, and no package.json — it is a standalone TypeScript module.

The file is organized into sections:

1. **Types** — Four exported interfaces: `StripeTestCard` (base), `StripeDeclineCard`, `Stripe3DSCard`, `StripeCountryCard`
2. **Card collections** — Named `const` objects, each typed with `as const satisfies`:
   - `STANDARD_CARDS` — Always-succeeding cards across major networks (Visa, Mastercard, Amex, Discover, JCB, UnionPay, etc.)
   - `CO_BRANDED_CARDS` — Cartes Bancaires and EFTPOS Australia co-branded variants
   - `DECLINED_CARDS` — Cards that trigger specific decline codes
   - `RADAR_CARDS` — Cards that simulate Stripe Radar fraud-scoring outcomes
   - `DISPUTE_CARDS` — Cards that trigger dispute/chargeback flows
   - `DISPUTE_DEFLECTION_CARDS` — Visa RDR, CE3, Ethoca Alerts
   - `THREE_DS_CARDS` — 3D Secure / SCA scenarios (required, supported, frictionless, challenge flows)
   - `TERMINAL_CARDS` — In-person / PIN scenarios
   - `REFUND_CARDS` — Async refund state transitions
   - `BALANCE_CARDS` — Cards that bypass pending balance
   - `COUNTRY_CARDS` — Country-specific billing cards
3. **Convenience exports** — `DEFAULT_CARD_NUMBER` (Visa 4242…) and `ALL_CARDS` (flat lookup of every card keyed by name)

## Conventions

- Each card entry has `number`, `brand`, `cvc`, `expiry`, and `description`. Decline cards add `errorCode`/`declineCode`; 3DS cards add `threeDSStatus`/`outcome`; country cards add `country`.
- Optional `pmId` (`pm_card_*`) and `tokenId` (`tok_*`) fields are included where Stripe provides programmatic identifiers.
- All collections use `as const satisfies <Type>` to get both literal inference and type-checking at the same time.
- Helper constants `CVC3`, `CVC4`, and `FUTURE` are used internally to avoid repeating literal strings.
