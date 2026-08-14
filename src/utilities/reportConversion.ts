/**
 * Fires the "Contact" conversion event GTM listens for (tag "Google Ads –
 * Contact Conversion", trigger "Contact Form Success" on this exact event
 * name) - keep this event name in sync with that GTM trigger.
 */
export function reportContactConversion(formType: string = 'contact_form') {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'form_submission_success',
    form_type: formType,
    page_url: window.location.href,
  })
}
