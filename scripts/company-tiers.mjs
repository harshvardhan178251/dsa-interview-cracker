/**
 * The company tiers and the rules used to tag problems with them.
 *
 * Shared by `scripts/normalise-companies.mjs` (which applies the rules to the
 * problem write-ups) and `web/scripts/generate-guides.mjs` (which explains them
 * in the company map), so the two can never drift apart.
 */

/** The broadest pools — product companies that ask a very wide range. */
export const TIER0 = ['Amazon', 'Google', 'Meta']

/** Broad, but noticeably smaller pools. */
export const TIER1 = [
  'Microsoft', 'Uber', 'Bloomberg', 'Adobe', 'Apple', 'LinkedIn', 'Airbnb',
  'Facebook', 'Netflix', 'Salesforce', 'Goldman Sachs', 'JP Morgan',
]

/** Genuinely selective. */
export const TIER2 = [
  'Flipkart', 'ByteDance', 'Oracle', 'Lyft', 'Stripe', 'Cloudflare',
  'Pinterest', 'Twitter', 'Intel', 'Visa', 'Paytm', 'Walmart', 'eBay',
  'Zillow', 'Spotify', 'Datadog',
]

/**
 * IT services and global SIs. These hire at volume and run DSA-heavy campus
 * loops, so their pool is wide — but narrower than the product companies.
 */
export const TIER3 = [
  'TCS', 'Wipro', 'Infosys', 'HCLTech', 'Cognizant', 'Tech Mahindra',
  'Capgemini', 'Accenture',
]

/** Everything else that is selective. */
export const TIER4 = [
  'IBM', 'Siemens', 'Bosch', 'Samsung', 'Swiggy', 'Zomato', 'Razorpay',
  'Freshworks', 'Atlassian', 'Canva', 'Figma', 'Zebra', 'Dell', 'HSBC',
  'Barclays', 'Standard Chartered', 'EY', 'KPMG', 'Deloitte', 'Cisco',
  'Qualcomm', 'Sony', 'Philips',
]

export const TIERS = [TIER0, TIER1, TIER2, TIER3, TIER4]

export const TIER_LABELS = [
  'Product companies — the broadest pools',
  'Large product and fintech companies',
  'Selective product and startup companies',
  'IT services and global SIs',
  'Selective enterprise and other companies',
]

/** Tags that are not companies and should simply be dropped. */
export const REMOVE = new Set(['Poker sites'])

/**
 * How many companies a problem gets from each tier, by how likely it is to be
 * asked. Keyed by the problem's "fame" tier.
 */
export const SELECTION = {
  A: { 0: 3, 1: 3, 2: 1, 3: 2, 4: 1 },
  B: { 0: 2, 1: 2, 2: 1, 3: 2, 4: 1 },
  C: { 0: 1, 1: 2, 2: 0, 3: 1, 4: 1 },
  D: { 0: 1, 1: 1, 2: 0, 3: 1, 4: 0 },
  E: { 0: 1, 1: 1, 2: 0, 3: 0, 4: 0 },
}

/** The fame tier of a problem: frequent + has a LeetCode number → A, and so on. */
export function fameTier(frequency, hasLeetCode) {
  if (frequency >= 5 && hasLeetCode) return 'A'
  if (frequency >= 5 || (frequency >= 4 && hasLeetCode)) return 'B'
  if (frequency >= 4 || (frequency >= 3 && hasLeetCode)) return 'C'
  if (frequency >= 3 || (frequency >= 2 && hasLeetCode)) return 'D'
  return 'E'
}

/** The tier index a company belongs to, or -1 when it is not tiered. */
export function tierIndexOf(company) {
  return TIERS.findIndex((tier) => tier.includes(company))
}
