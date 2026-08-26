import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Temporary, one-off route to force-clear the persisted Data Cache entry for the
// IT AMC page on production. Standalone scripts can't call revalidatePath/revalidateTag
// correctly (no request-scoped store), so this has to run inside a real request. Remove
// this route once the cache has been cleared — it's not meant to stick around.
// Access phrase is unique to this disposable route only, not a credential reused
// anywhere else — production's PAYLOAD_SECRET isn't accessible from here.
const ACCESS_PHRASE = 'clear-it-amc-cache-please-2026'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key || key !== ACCESS_PHRASE) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/service/it-amc-dubai-uae')
  revalidateTag('page_it-amc-dubai-uae')
  revalidateTag('pages-sitemap')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
