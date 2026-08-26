import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Temporary, one-off route to force-clear the persisted Data Cache entry for the
// IT AMC page on production. Standalone scripts can't call revalidatePath/revalidateTag
// correctly (no request-scoped store), so this has to run inside a real request. Remove
// this route once the cache has been cleared — it's not meant to stick around.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/service/it-amc-dubai-uae')
  revalidateTag('page_it-amc-dubai-uae')
  revalidateTag('pages-sitemap')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
