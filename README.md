# stripe-test-cards

A typed reference of all Stripe test card numbers for use in test suites.

## Motivation

Stripe's test card numbers are scattered across their documentation. Every project that integrates Stripe ends up with the same magic strings copy-pasted into tests — `4242424242424242` here, `4000000000000002` there — with no indication of what they do or whether they're still current.

This library centralises all of them in one place, organised by use case, with full TypeScript types. Your editor autocompletes the card you need; the library documents what it does.

```ts
// Before
cardNumber: "4000000000009995" // declined? which one? why?

// After
cardNumber: cards.declined.insufficientFunds.number
```

## Installation

```bash
npm install stripe-test-cards
```

## Usage

```ts
import cards from 'stripe-test-cards';
```

Every card object has `number`, `brand`, `cvc`, `expiry`, and `description`. Use `number` to fill in your Stripe API calls or test form inputs.

### Happy-path tests

```ts
await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method: cards.standard.visa.pmId,
  confirm: true,
});
```

### Decline handling

```ts
it('shows an error on insufficient funds', async () => {
  await fillCardForm(cards.declined.insufficientFunds.number);
  await expect(page.getByText('Your card has insufficient funds')).toBeVisible();
});

it('shows an error on expired card', async () => {
  await fillCardForm(cards.declined.expiredCard.number);
  await expect(page.getByText('Your card has expired')).toBeVisible();
});
```

### 3D Secure / SCA

```ts
it('completes payment after 3DS authentication', async () => {
  await fillCardForm(cards.threeDS.requiredIe.number);
  await handle3DSModal(); // authenticate in the Stripe iframe
  await expect(page.getByText('Payment successful')).toBeVisible();
});

it('handles frictionless 3DS without user interaction', async () => {
  await fillCardForm(cards.threeDS.frictionless.number);
  await expect(page.getByText('Payment successful')).toBeVisible();
});
```

### Radar / fraud scenarios

```ts
it('blocks a high-risk card', async () => {
  await fillCardForm(cards.radar.alwaysBlocked.number);
  await expect(page.getByText('Your card was declined')).toBeVisible();
});
```

### Country-specific billing

```ts
// Keys are ISO 3166-1 alpha-2 country codes
await fillCardForm(cards.country.DE.number); // Germany
await fillCardForm(cards.country.GB.number); // United Kingdom
await fillCardForm(cards.country.JP.number); // Japan
```

### Parameterised tests

`cards.all` is a flat object containing every card across all categories — useful for smoke-testing your payment flow against the full set.

```ts
it.each(Object.entries(cards.all))('processes card %s without throwing', async (_name, card) => {
  await expect(submitPayment(card.number)).resolves.not.toThrow();
});
```

## Available categories

| Property | Description |
|---|---|
| `cards.standard` | Always-succeeding cards across all major networks |
| `cards.coBranded` | Cartes Bancaires and EFTPOS Australia co-branded cards |
| `cards.declined` | Cards that trigger specific decline codes |
| `cards.radar` | Radar fraud-scoring scenarios |
| `cards.dispute` | Cards that trigger disputes or chargebacks |
| `cards.disputeDeflection` | Visa RDR, Compelling Evidence 3.0, Ethoca Alerts |
| `cards.threeDS` | 3D Secure / SCA flows (required, frictionless, challenge, etc.) |
| `cards.terminal` | In-person / PIN scenarios |
| `cards.refund` | Async refund state transitions |
| `cards.balance` | Cards where funds bypass the pending balance |
| `cards.country` | Cards issued in specific countries (ISO 3166-1 alpha-2 keys) |
| `cards.all` | Flat spread of all cards for parameterised tests |

## TypeScript

The library exports four interfaces you can use to type your own helpers:

```ts
import type { StripeTestCard, StripeDeclineCard, Stripe3DSCard, StripeCountryCard } from 'stripe-test-cards';

function fillCardForm(card: StripeTestCard) {
  // card.number, card.cvc, card.expiry are all typed
}

function assertDeclineCode(card: StripeDeclineCard, expected: string) {
  expect(card.declineCode).toBe(expected);
}
```

## Notes

- All test cards work only with Stripe **test mode** API keys (`sk_test_...`).
- CVC can be any 3-digit number (4 digits for Amex). Expiry can be any future date.
- Where available, `pmId` (`pm_card_*`) and `tokenId` (`tok_*`) are included for API-level testing without needing to tokenise a card number.
