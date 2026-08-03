import type { Metadata } from 'next'

// Falls back to the known-good token already deployed on Vercel so verification
// never silently breaks if the env var isn't set there yet.
const GOOGLE_FALLBACK = '3weeUMiLT2YYr4-b07O4UECbKv9pc19Jlh5lbvha_-0'

export function getSiteVerification(): Metadata['verification'] {
  const google = [process.env.GOOGLE_SITE_VERIFICATION || GOOGLE_FALLBACK]
  // Search Console issues a new, distinct token per property/verification attempt
  // (e.g. verifying the URL-prefix property separately from the domain property).
  // Kept as a second token rather than replacing the one above so any
  // already-verified property doesn't lose its meta tag and become unverified.
  if (process.env.GOOGLE_SITE_VERIFICATION_2) {
    google.push(process.env.GOOGLE_SITE_VERIFICATION_2)
  }
  const bing = process.env.BING_SITE_VERIFICATION

  return {
    google,
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  }
}
