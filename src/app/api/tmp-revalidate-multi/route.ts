import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Temporary, one-off route to force-clear the persisted Data Cache entries for
// pages edited via script (disableRevalidate: true) since the last real
// revalidation. Standalone scripts can't call revalidatePath/revalidateTag
// correctly (no request-scoped store), so this has to run inside a real
// request on the deployed app. Remove this route once the cache is cleared —
// it's not meant to stick around.
// Access phrase is unique to this disposable route only, not a credential
// reused anywhere else — production's PAYLOAD_SECRET isn't accessible from here.
const ACCESS_PHRASE = 'clear-stale-page-cache-2026-09-01'

const SLUGS = [
  'video-conferencing-solutions-dubai-uae',
  'meeting-room-solutions-dubai-uae',
  'it-amc-dubai-uae',
]

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key || key !== ACCESS_PHRASE) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  for (const slug of SLUGS) {
    revalidatePath(`/service/${slug}`)
    revalidateTag(`page_${slug}`)
  }
  revalidateTag('pages-sitemap')

  return NextResponse.json({ revalidated: true, slugs: SLUGS, now: Date.now() })
}
