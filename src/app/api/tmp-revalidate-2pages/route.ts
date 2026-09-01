import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Temporary, one-off route to force-clear the persisted Data Cache entries for
// the New Office IT Setup and IT Relocation pages on production. Standalone
// scripts can't call revalidatePath/revalidateTag correctly (no request-scoped
// store), so this has to run inside a real request on the deployed app.
// Remove this route once the cache is cleared — it's not meant to stick around.
const ACCESS_PHRASE = 'clear-office-relocation-cache-2026-09-01'

const SLUGS = ['new-office-it-setup-dubai-uae', 'it-relocation-dubai-uae']

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
