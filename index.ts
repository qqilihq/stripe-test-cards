/**
 * Stripe Test Cards
 *
 * A comprehensive, typed reference of all Stripe test card numbers.
 * Use these in your test suites with Stripe's sandbox/test API keys.
 *
 * General rules:
 * - CVC: any 3-digit number (4 digits for American Express)
 * - Expiry: any future date (e.g. "12/34")
 * - Never use real card data in tests
 *
 * @see https://docs.stripe.com/testing
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A Stripe test card usable for interactive (form-based) testing. */
export interface StripeTestCard {
  /** Card number (no spaces). */
  number: string;
  /** Card network / brand. */
  brand: string;
  /** Accepted CVC format. */
  cvc: "any 3 digits" | "any 4 digits";
  /** Accepted expiry format. */
  expiry: "any future date";
  /** Description of card behaviour. */
  description: string;
  /** Programmatic PaymentMethod identifier (pm_card_*). Use in API calls to avoid PCI concerns. */
  pmId?: string;
  /** Legacy token identifier (tok_*). */
  tokenId?: string;
}

/** A test card that triggers a decline. */
export interface StripeDeclineCard extends StripeTestCard {
  /** Stripe error code returned on charge (e.g. "card_declined", "expired_card"). */
  errorCode: string;
  /** Stripe decline code, if applicable (e.g. "insufficient_funds"). */
  declineCode?: string;
}

/** A test card for 3D Secure / SCA scenarios. */
export interface Stripe3DSCard extends StripeTestCard {
  /** Whether 3DS authentication is required, supported, or not supported. */
  threeDSStatus: "required" | "supported" | "not_supported";
  /** Expected outcome after authentication attempt. */
  outcome: "succeeds" | "fails" | "error" | "frictionless";
}

/** A test card for geography-specific billing scenarios. */
export interface StripeCountryCard extends StripeTestCard {
  /** ISO 3166-1 alpha-2 country code. */
  country: string;
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

const CVC3 = "any 3 digits" as const;
const CVC4 = "any 4 digits" as const;
const FUTURE = "any future date" as const;

// ---------------------------------------------------------------------------
// 1. Standard cards (always succeed)
// ---------------------------------------------------------------------------

/**
 * Standard test cards that succeed for each major card brand.
 * Use these for happy-path tests.
 */
const standard = {
  /** Classic Stripe test Visa — the go-to for most tests. */
  visa: {
    number: "4242424242424242",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Standard Visa — always succeeds",
    pmId: "pm_card_visa",
    tokenId: "tok_visa",
  },

  visaDebit: {
    number: "4000056655665556",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Visa Debit — always succeeds",
    pmId: "pm_card_visa_debit",
    tokenId: "tok_visa_debit",
  },

  mastercard: {
    number: "5555555555554444",
    brand: "Mastercard",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Standard Mastercard — always succeeds",
    pmId: "pm_card_mastercard",
    tokenId: "tok_mastercard",
  },

  mastercard2Series: {
    number: "2223003122003222",
    brand: "Mastercard",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Mastercard 2-series — always succeeds",
  },

  mastercardDebit: {
    number: "5200828282828210",
    brand: "Mastercard",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Mastercard Debit — always succeeds",
    pmId: "pm_card_mastercard_debit",
  },

  mastercardPrepaid: {
    number: "5105105105105100",
    brand: "Mastercard",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Mastercard Prepaid — always succeeds",
    pmId: "pm_card_mastercard_prepaid",
  },

  amex: {
    number: "378282246310005",
    brand: "American Express",
    cvc: CVC4,
    expiry: FUTURE,
    description: "American Express — always succeeds",
    pmId: "pm_card_amex",
    tokenId: "tok_amex",
  },

  amexAlt: {
    number: "371449635398431",
    brand: "American Express",
    cvc: CVC4,
    expiry: FUTURE,
    description: "American Express (alternate number) — always succeeds",
  },

  discover: {
    number: "6011111111111117",
    brand: "Discover",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Discover — always succeeds",
    pmId: "pm_card_discover",
    tokenId: "tok_discover",
  },

  discoverAlt: {
    number: "6011000990139424",
    brand: "Discover",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Discover (alternate number) — always succeeds",
  },

  discoverDebit: {
    number: "6011981111111113",
    brand: "Discover",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Discover Debit — always succeeds",
  },

  dinersClub: {
    number: "3056930009020004",
    brand: "Diners Club",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Diners Club — always succeeds",
    pmId: "pm_card_diners",
    tokenId: "tok_diners",
  },

  dinersClub14: {
    number: "36227206271667",
    brand: "Diners Club",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Diners Club 14-digit — always succeeds",
  },

  bccardDinacard: {
    number: "6555900000604105",
    brand: "BCcard / DinaCard",
    cvc: CVC3,
    expiry: FUTURE,
    description: "BCcard/DinaCard — always succeeds",
  },

  jcb: {
    number: "3566002020360505",
    brand: "JCB",
    cvc: CVC3,
    expiry: FUTURE,
    description: "JCB — always succeeds",
    pmId: "pm_card_jcb",
    tokenId: "tok_jcb",
  },

  unionpay: {
    number: "6200000000000005",
    brand: "UnionPay",
    cvc: CVC3,
    expiry: FUTURE,
    description: "UnionPay — always succeeds",
    pmId: "pm_card_unionpay",
    tokenId: "tok_unionpay",
  },

  unionpayDebit: {
    number: "6200000000000047",
    brand: "UnionPay",
    cvc: CVC3,
    expiry: FUTURE,
    description: "UnionPay Debit — always succeeds",
  },

  unionpay19Digit: {
    number: "6205500000000000004",
    brand: "UnionPay",
    cvc: CVC3,
    expiry: FUTURE,
    description: "UnionPay 19-digit — always succeeds",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 2. Co-branded cards
// ---------------------------------------------------------------------------

/**
 * Co-branded test cards (e.g. Cartes Bancaires, EFTPOS Australia).
 * Useful for testing routing logic on co-branded networks.
 */
const coBranded = {
  visaCartesBancaires: {
    number: "4000002500001001",
    brand: "Visa / Cartes Bancaires",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Visa co-branded with Cartes Bancaires — always succeeds",
    pmId: "pm_card_visa_cartesBancaires",
    tokenId: "tok_visa_cartesBancaires",
  },

  mastercardCartesBancaires: {
    number: "5555552500001001",
    brand: "Mastercard / Cartes Bancaires",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Mastercard co-branded with Cartes Bancaires — always succeeds",
    pmId: "pm_card_mastercard_cartesBancaires",
    tokenId: "tok_mastercard_cartesBancaires",
  },

  visaEftposAu: {
    number: "4000050360000001",
    brand: "Visa / EFTPOS Australia",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Visa Debit co-branded with EFTPOS Australia — always succeeds",
    pmId: "pm_card_visa_debit_eftposAuCoBranded",
    tokenId: "tok_visa_debit_eftposAuCoBranded",
  },

  mastercardEftposAu: {
    number: "5555050360000080",
    brand: "Mastercard / EFTPOS Australia",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Mastercard Debit co-branded with EFTPOS Australia — always succeeds",
    pmId: "pm_card_mastercard_debit_eftposAuCoBranded",
    tokenId: "tok_mastercard_debit_eftposAuCoBranded",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 3. Declined cards
// ---------------------------------------------------------------------------

/**
 * Test cards that trigger specific decline errors.
 * Use these to test your error-handling and user-facing error messages.
 *
 * All cards are Visa; CVC = any 3 digits; expiry = any future date.
 */
const declined = {
  /** Generic decline — no specific reason. errorCode: card_declined, declineCode: generic_decline */
  genericDecline: {
    number: "4000000000000002",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Generic decline",
    errorCode: "card_declined",
    declineCode: "generic_decline",
  },

  /** Declined due to insufficient funds. errorCode: card_declined, declineCode: insufficient_funds */
  insufficientFunds: {
    number: "4000000000009995",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — insufficient funds",
    errorCode: "card_declined",
    declineCode: "insufficient_funds",
  },

  /** Declined because card is reported lost. errorCode: card_declined, declineCode: lost_card */
  lostCard: {
    number: "4000000000009987",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — lost card",
    errorCode: "card_declined",
    declineCode: "lost_card",
  },

  /** Declined because card is reported stolen. errorCode: card_declined, declineCode: stolen_card */
  stolenCard: {
    number: "4000000000009979",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — stolen card",
    errorCode: "card_declined",
    declineCode: "stolen_card",
  },

  /** Declined because card is expired. errorCode: expired_card */
  expiredCard: {
    number: "4000000000000069",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — expired card",
    errorCode: "expired_card",
  },

  /** Declined due to incorrect CVC. errorCode: incorrect_cvc */
  incorrectCvc: {
    number: "4000000000000127",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — incorrect CVC",
    errorCode: "incorrect_cvc",
  },

  /** Declined due to a processing error. errorCode: processing_error */
  processingError: {
    number: "4000000000000119",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — processing error",
    errorCode: "processing_error",
  },

  /** Fails Luhn check — invalid card number. errorCode: incorrect_number */
  incorrectNumber: {
    number: "4242424242424241",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — incorrect card number (fails Luhn check)",
    errorCode: "incorrect_number",
  },

  /** Declined because card velocity limit exceeded. errorCode: card_declined, declineCode: card_velocity_exceeded */
  velocityExceeded: {
    number: "4000000000006975",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Declined — card velocity exceeded",
    errorCode: "card_declined",
    declineCode: "card_velocity_exceeded",
  },

  /**
   * Attaches successfully to a Customer object but every subsequent charge fails.
   * Useful for testing save-card-then-charge flows.
   * errorCode: card_declined
   */
  attachThenFail: {
    number: "4000000000000341",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Attaches to Customer successfully; all subsequent charges fail with card_declined",
    errorCode: "card_declined",
  },
} as const satisfies Record<string, StripeDeclineCard>;

// ---------------------------------------------------------------------------
// 4. Fraud / Radar test cards
// ---------------------------------------------------------------------------

/**
 * Test cards that simulate various Radar fraud-scoring scenarios.
 * Results depend on your Radar rule configuration.
 */
const radar = {
  /** Highest risk level — always blocked by Radar. */
  alwaysBlocked: {
    number: "4100000000000019",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Highest risk — always blocked by Radar",
  },

  /** Highest risk — may be blocked depending on Radar settings. */
  highestRisk: {
    number: "4000000000004954",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Highest risk score — may be blocked by Radar rules",
  },

  /** Elevated risk — may be queued for review by Radar for Fraud Teams. */
  elevatedRisk: {
    number: "4000000000009235",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Elevated risk — may trigger Radar review queue",
  },

  /** High fraud dispute score. */
  highDisputeScore: {
    number: "4000008400000407",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "High fraud dispute score — may be blocked by Radar",
  },

  /** High early fraud warning score. */
  highEfwScore: {
    number: "4000008400000159",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "High early fraud warning score — may be blocked by Radar",
  },

  /** Triggers Radar dynamic risk threshold control (when enabled). */
  dynamicRiskThreshold: {
    number: "4000008401001017",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Triggers Radar dynamic risk threshold control when enabled",
  },

  /** Triggers Radar Adaptive 3DS control (when enabled). */
  adaptive3DS: {
    number: "4000008405600003",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Triggers Radar Adaptive 3DS control when enabled",
  },

  /** CVC check fails — succeeds unless blocked by a custom Radar rule. */
  cvcCheckFails: {
    number: "4000000000000101",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "CVC check fails; payment succeeds unless blocked by Radar rule",
  },

  /** Zip/postal code check fails. */
  zipCheckFails: {
    number: "4000000000000036",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Zip/postal code check fails; payment succeeds unless blocked by Radar rule",
  },

  /** CVC check fails with elevated risk. */
  cvcFailsElevated: {
    number: "4000058400307872",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "CVC check fails with elevated risk — may be blocked by Radar",
  },

  /** Zip check fails with elevated risk. */
  zipFailsElevated: {
    number: "4000058400306072",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Zip check fails with elevated risk — may be blocked by Radar",
  },

  /** Address line 1 check fails — payment succeeds unless blocked by a custom Radar rule. */
  addressLine1Fails: {
    number: "4000000000000028",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Address line 1 check fails; payment succeeds unless blocked by Radar rule",
  },

  /** Both zip and address line 1 checks fail. */
  zipAndAddressFail: {
    number: "4000000000000010",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Both zip and address line 1 checks fail — may be blocked by Radar",
  },

  /** Both zip and address line 1 checks return unavailable. */
  zipAndAddressUnavailable: {
    number: "4000000000000044",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Both zip and address line 1 checks return unavailable; payment succeeds unless blocked by Radar rule",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 5. Dispute / chargeback test cards
// ---------------------------------------------------------------------------

/**
 * Test cards that succeed initially but then trigger disputes or chargebacks.
 * Use these to test your dispute-handling logic.
 */
const dispute = {
  /** Succeeds, then disputed as fraudulent (protected by 3DS auth). */
  fraudProtected: {
    number: "4000000000000259",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; disputed as fraudulent — protected by 3DS authentication",
  },

  /** Succeeds, then disputed as product not received (NOT protected by 3DS). */
  productNotReceived: {
    number: "4000000000002685",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; disputed as product not received — NOT protected by 3DS",
  },

  /** Succeeds, then disputed as an inquiry. */
  inquiry: {
    number: "4000000000001976",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; disputed as an inquiry",
  },

  /** Succeeds, then triggers an early fraud warning. */
  earlyFraudWarning: {
    number: "4000000000005423",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; triggers early fraud warning",
  },

  /** Succeeds, then disputed multiple times. */
  multipleDisputes: {
    number: "4000000404000079",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; triggers multiple disputes",
  },

  /** Succeeds; eligible for Visa Compelling Evidence 3.0 dispute. */
  compellingEvidenceEligible: {
    number: "4000000404000038",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; eligible for Visa Compelling Evidence 3.0 dispute",
  },

  /** Succeeds; treated as a Visa compliance dispute. */
  complianceDispute: {
    number: "4000008400000779",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Succeeds; treated as Visa compliance dispute",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 6. Dispute deflection / resolution cards
// ---------------------------------------------------------------------------

/**
 * Cards that interact with dispute-deflection services (Visa RDR, Ethoca, etc.).
 */
const disputeDeflection = {
  /** Visa RDR prevents dispute if account is registered; otherwise dispute is created. */
  visaRdr: {
    number: "4000000404004816",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Visa RDR prevents dispute if registered for Dispute Deflection; otherwise creates dispute",
  },

  /** Compelling Evidence 3.0 blocks dispute if registered; otherwise creates dispute. */
  ce3Deflection: {
    number: "4000000404005649",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Compelling Evidence 3.0 blocks dispute if registered for Dispute Deflection; otherwise creates dispute",
  },

  /** Ethoca Alerts prevent dispute if registered for Dispute Resolution; otherwise creates dispute. */
  ethocaAlert: {
    number: "5105000300000018",
    brand: "Mastercard",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Ethoca Alerts prevent dispute if registered for Dispute Resolution; otherwise creates dispute",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 7. 3D Secure / SCA test cards
// ---------------------------------------------------------------------------

/**
 * Test cards for 3D Secure (3DS / 3DS2) and Strong Customer Authentication (SCA) scenarios.
 * Essential for testing European payment flows.
 */
const threeDS = {
  // -- Standard 3DS behaviour --

  /**
   * 3DS REQUIRED — issued in Ireland (IE).
   * Radar requests 3DS by default. Authentication succeeds.
   */
  requiredIe: {
    number: "4000000000003220",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS required (IE-issued); Radar requests 3DS by default; authentication succeeds",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /**
   * 3DS REQUIRED — issued in USA (US).
   * Radar requests 3DS by default. Authentication succeeds.
   */
  requiredUs: {
    number: "4000008400000027",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS required (US-issued); Radar requests 3DS by default; authentication succeeds",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /**
   * 3DS REQUIRED — payment fails with card_declined after authentication.
   */
  requiredThenDeclined: {
    number: "4000008400001629",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS required; payment fails with card_declined after successful authentication",
    threeDSStatus: "required",
    outcome: "fails",
  },

  /**
   * 3DS REQUIRED — 3DS lookup fails with processing error.
   */
  requiredLookupError: {
    number: "4000008400001280",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS required; 3DS lookup fails with processing error",
    threeDSStatus: "required",
    outcome: "error",
  },

  /**
   * 3DS SUPPORTED but NOT required.
   * Radar does NOT request 3DS by default. Payment succeeds without 3DS.
   */
  supportedNotRequired: {
    number: "4000000000003055",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS supported but not required; Radar does not request 3DS by default; payment succeeds",
    threeDSStatus: "supported",
    outcome: "succeeds",
  },

  /**
   * 3DS SUPPORTED — attempting 3DS causes a processing error.
   * Radar does NOT request 3DS by default.
   */
  supported3dsError: {
    number: "4000000000003097",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS supported; attempting 3DS causes processing error; Radar does not request 3DS by default",
    threeDSStatus: "supported",
    outcome: "error",
  },

  /**
   * Standard Visa — 3DS SUPPORTED but card is not enrolled.
   * Customer will not be prompted for 3DS.
   */
  notEnrolled: {
    number: "4242424242424242",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS supported but card not enrolled; customer not prompted for 3DS",
    threeDSStatus: "supported",
    outcome: "succeeds",
    pmId: "pm_card_visa",
  },

  /**
   * American Express — 3DS NOT SUPPORTED.
   * Proceeds without authentication.
   */
  amexNotSupported: {
    number: "378282246310005",
    brand: "American Express",
    cvc: CVC4,
    expiry: FUTURE,
    description: "3DS not supported; proceeds without authentication",
    threeDSStatus: "not_supported",
    outcome: "succeeds",
    pmId: "pm_card_amex",
  },

  // -- Setup / future usage --

  /**
   * Requires authentication for off-session payments UNLESS the card has been
   * set up for future use. On-session always requires authentication.
   */
  requiresAuthOffSession: {
    number: "4000002500003155",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Requires auth for off-session payments unless set up for future use; on-session always requires auth",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /**
   * Always requires authentication for ALL transactions regardless of how it was set up.
   */
  alwaysRequiresAuth: {
    number: "4000002760003184",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Always requires authentication for all transactions",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /**
   * Already set up for off-session use.
   * Off-session payments succeed; on-session still requires authentication.
   */
  setupForOffSession: {
    number: "4000003800000446",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Already set up for off-session use; off-session succeeds; on-session still requires auth",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /**
   * Requires authentication for one-time payments.
   * ALL charges fail with insufficient_funds even after successful authentication.
   */
  authThenInsufficientFunds: {
    number: "4000008260003178",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Requires auth for one-time payments; all charges fail with insufficient_funds after successful auth",
    threeDSStatus: "required",
    outcome: "fails",
  },

  // -- Frictionless flow --

  /** 3DS required on all transactions; frictionless flow; authentication succeeds. */
  frictionless: {
    number: "4000000032200000",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS required; frictionless flow; authentication succeeds",
    threeDSStatus: "required",
    outcome: "frictionless",
  },

  // -- 3DS2 challenge flows --

  /** 3DS2 required; Out-of-Band (OOB) challenge flow. */
  challengeOob: {
    number: "4000582600000094",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS2 required; challenge flow — Out-of-Band (OOB) UI",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /** 3DS2 required; One-Time Passcode challenge flow. */
  challengeOtp: {
    number: "4000582600000045",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS2 required; challenge flow — One-Time Passcode (OTP) UI",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /** 3DS2 required; Single-Select challenge flow. */
  challengeSingleSelect: {
    number: "4000582600000102",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS2 required; challenge flow — Single-Select UI",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /** 3DS2 required; Multi-Select challenge flow. */
  challengeMultiSelect: {
    number: "4000582600000110",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "3DS2 required; challenge flow — Multi-Select UI",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  // -- Captcha challenge --

  /** Payment succeeds if the user correctly answers a captcha challenge. */
  captcha1: {
    number: "4000000000001208",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Payment succeeds if user correctly answers captcha challenge",
    threeDSStatus: "required",
    outcome: "succeeds",
  },

  /** Payment succeeds if the user correctly answers a captcha challenge (alternate). */
  captcha2: {
    number: "4000000000003725",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Payment succeeds if user correctly answers captcha challenge (alternate)",
    threeDSStatus: "required",
    outcome: "succeeds",
  },
} as const satisfies Record<string, Stripe3DSCard>;

// ---------------------------------------------------------------------------
// 8. Terminal / PIN / SCA cards
// ---------------------------------------------------------------------------

/**
 * Test cards for in-person / terminal payment scenarios with PIN/SCA requirements.
 */
const terminal = {
  /** Simulates offline PIN verification. cardholder_verification_method = offline_pin */
  offlinePin: {
    number: "4001007020000002",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Simulates offline PIN; cardholder_verification_method = offline_pin",
  },

  /** SCA retry: contactless fails, insert card + offline PIN required. */
  scaRetryOfflinePin: {
    number: "4000008260000075",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "SCA retry: contactless fails, insert card + offline PIN; cardholder_verification_method = offline_pin",
  },

  /** Simulates online PIN verification. cardholder_verification_method = online_pin */
  onlinePin: {
    number: "4001000360000005",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Simulates online PIN; cardholder_verification_method = online_pin",
  },

  /** SCA retry: contactless fails, insert card + online PIN required. */
  scaRetryOnlinePin: {
    number: "4000002760000008",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "SCA retry: contactless fails, insert card + online PIN; cardholder_verification_method = online_pin",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 9. Async refund behaviour cards
// ---------------------------------------------------------------------------

/**
 * Test cards for async refund state transitions.
 */
const refund = {
  /** Payment succeeds; refund starts as pending, then transitions to succeeded. */
  pendingToSucceeded: {
    number: "4000000000007726",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Payment succeeds; refund starts as pending → transitions to succeeded",
  },

  /** Payment succeeds; refund starts as succeeded, then transitions to failed. */
  succeededToFailed: {
    number: "4000000000005126",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "Payment succeeds; refund starts as succeeded → transitions to failed",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 10. Balance / payout bypass cards
// ---------------------------------------------------------------------------

/**
 * Cards where funds bypass the pending balance and go directly to available balance.
 * Useful for testing payout and balance scenarios.
 */
const balance = {
  /** US charge succeeds; funds skip pending balance, go directly to available balance. */
  bypassPendingUs: {
    number: "4000000000000077",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "US charge; funds bypass pending balance → directly to available balance",
  },

  /** International charge succeeds; funds skip pending balance. */
  bypassPendingInternational: {
    number: "4000003720000278",
    brand: "Visa",
    cvc: CVC3,
    expiry: FUTURE,
    description: "International charge; funds bypass pending balance → directly to available balance",
  },
} as const satisfies Record<string, StripeTestCard>;

// ---------------------------------------------------------------------------
// 11. Country-specific cards
// ---------------------------------------------------------------------------

/**
 * Country-specific test cards for geo-billing tests.
 * Use these when your integration needs to simulate cards issued in a particular country.
 * Keys are ISO 3166-1 alpha-2 country codes.
 *
 * @see https://docs.stripe.com/testing#international-cards
 */
const country = {
  // Americas
  US: { number: "4242424242424242", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "US", description: "United States", pmId: "pm_card_us" },
  BR: { number: "4000000760000002", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "BR", description: "Brazil", pmId: "pm_card_br" },
  CA: { number: "4000001240000000", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "CA", description: "Canada", pmId: "pm_card_ca" },
  MX: { number: "4000004840008001", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "MX", description: "Mexico", pmId: "pm_card_mx" },

  // Europe
  GB: { number: "4000008260000000", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "GB", description: "United Kingdom", pmId: "pm_card_gb" },
  GB_DEBIT: { number: "4000058260000005", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "GB", description: "United Kingdom — Visa Debit" },
  GB_MC: { number: "5555558265554449", brand: "Mastercard", cvc: CVC3, expiry: FUTURE, country: "GB", description: "United Kingdom — Mastercard" },
  DE: { number: "4000002760000016", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "DE", description: "Germany", pmId: "pm_card_de" },
  FR: { number: "4000002500000003", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "FR", description: "France", pmId: "pm_card_fr" },
  AT: { number: "4000000400000008", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "AT", description: "Austria", pmId: "pm_card_at" },
  BE: { number: "4000000560000004", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "BE", description: "Belgium", pmId: "pm_card_be" },
  CH: { number: "4000007560000009", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "CH", description: "Switzerland", pmId: "pm_card_ch" },
  DK: { number: "4000002080000001", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "DK", description: "Denmark", pmId: "pm_card_dk" },
  ES: { number: "4000007240000007", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "ES", description: "Spain", pmId: "pm_card_es" },
  FI: { number: "4000002460000001", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "FI", description: "Finland", pmId: "pm_card_fi" },
  IE: { number: "4000003720000005", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "IE", description: "Ireland", pmId: "pm_card_ie" },
  IT: { number: "4000003800000008", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "IT", description: "Italy", pmId: "pm_card_it" },
  NL: { number: "4000005280000002", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "NL", description: "Netherlands", pmId: "pm_card_nl" },
  NO: { number: "4000005780000007", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "NO", description: "Norway", pmId: "pm_card_no" },
  PL: { number: "4000006160000005", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "PL", description: "Poland", pmId: "pm_card_pl" },
  PT: { number: "4000006200000007", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "PT", description: "Portugal", pmId: "pm_card_pt" },
  SE: { number: "4000007520000008", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "SE", description: "Sweden", pmId: "pm_card_se" },

  // Asia-Pacific
  AU: { number: "4000000360000006", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "AU", description: "Australia", pmId: "pm_card_au" },
  JP: { number: "4000003920000003", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "JP", description: "Japan", pmId: "pm_card_jp" },
  JP_JCB: { number: "3530111333300000", brand: "JCB", cvc: CVC3, expiry: FUTURE, country: "JP", description: "Japan — JCB" },
  HK: { number: "4000003440000004", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "HK", description: "Hong Kong", pmId: "pm_card_hk" },
  SG: { number: "4000007020000003", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "SG", description: "Singapore", pmId: "pm_card_sg" },
  IN: { number: "4000003560000008", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "IN", description: "India", pmId: "pm_card_in" },
  NZ: { number: "4000005540000008", brand: "Visa", cvc: CVC3, expiry: FUTURE, country: "NZ", description: "New Zealand", pmId: "pm_card_nz" },
} as const satisfies Record<string, StripeCountryCard>;

// ---------------------------------------------------------------------------
// Default export
// ---------------------------------------------------------------------------

/**
 * All Stripe test cards, grouped by use case.
 *
 * @example
 * import cards from 'stripe-test-cards';
 *
 * // Happy-path test
 * cardNumber: cards.standard.visa.number
 *
 * // Decline test
 * cardNumber: cards.declined.insufficientFunds.number
 *
 * // 3DS test
 * cardNumber: cards.threeDS.requiredIe.number
 *
 * // Parameterised test over every card
 * it.each(Object.entries(cards.all))('handles %s', (_name, card) => { ... })
 */
const cards = {
  standard,
  coBranded,
  declined,
  radar,
  dispute,
  disputeDeflection,
  threeDS,
  terminal,
  refund,
  balance,
  country,
  /** Flat lookup of every card by key — useful for parameterised tests. */
  all: {
    ...standard,
    ...coBranded,
    ...declined,
    ...radar,
    ...dispute,
    ...disputeDeflection,
    ...threeDS,
    ...terminal,
    ...refund,
    ...balance,
  },
} as const;

export default cards;
