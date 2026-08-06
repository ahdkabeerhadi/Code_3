declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean
  }
}

/** Fires the Google Ads "Contact" conversion event set up in the root layout. */
export function reportContactConversion() {
  if (typeof window !== 'undefined' && window.gtag_report_conversion) {
    window.gtag_report_conversion()
  }
}
