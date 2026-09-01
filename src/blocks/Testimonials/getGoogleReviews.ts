export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

export async function getGoogleReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACES_ID

  if (!apiKey || !placeId) return null

  try {
    // Google caps this endpoint at 5 reviews no matter what, with no
    // pagination available - so sort for substance (its "most relevant"
    // default) rather than "newest", which can surface a bare star rating
    // with no actual comment ahead of reviews that are worth showing.
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId,
    )}&fields=reviews&reviews_sort=most_relevant&key=${apiKey}`

    // Without a timeout, a slow/hanging Google Places API response blocks the
    // entire page's server render - cap it so a bad external call can't do that.
    const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) })
    if (!res.ok) return null

    const data = await res.json()
    if (data.status !== 'OK' || !Array.isArray(data.result?.reviews)) return null

    return data.result.reviews
      // Drop reviews with no real comment (e.g. a bare star rating) - not
      // "good content" even though they're genuine reviews.
      .filter((r: GoogleReview) => (r.text || '').trim().length >= 20)
      .map((r: GoogleReview) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        relative_time_description: r.relative_time_description,
      }))
  } catch {
    return null
  }
}
