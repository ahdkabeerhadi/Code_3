import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

const BRAND_PAGE_PATHS = [
  '/service/yealink-video-conferencing-devices-dubai-uae',
  '/service/logitech-video-conferencing-devices-dubai-uae',
  '/service/jabra-video-conferencing-devices-dubai-uae',
  '/service/cisco-video-conferencing-devices-dubai-uae',
  '/service/poly-video-conferencing-devices-dubai-uae',
]

export const revalidateBrandDevicePages: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating brand device pages`)

    for (const path of BRAND_PAGE_PATHS) revalidatePath(path)
    revalidateTag('global_brandDevicePages')
  }

  return doc
}
