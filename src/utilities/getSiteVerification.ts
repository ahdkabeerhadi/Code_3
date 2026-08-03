import type { Metadata } from 'next'

// Falls back to the known-good token already deployed on Vercel so verification
// never silently breaks if the env var isn't set there yet.
const GOOGLE_FALLBACK = '3weeUMiLT2YYr4-b07O4UECbKv9pc19Jlh5lbvha_-0'

export function getSiteVerification(): Metadata['verification'] {
  const google = process.env.GOOGLE_SITE_VERIFICATION || GOOGLE_FALLBACK
  const bing = process.env.BING_SITE_VERIFICATION

  return {
    google,
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  }
}
