import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

const CATALOG_PATH = '/service/video-conferencing-devices-dubai-uae'

export const revalidateDevice: CollectionAfterChangeHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(CATALOG_PATH)
    revalidateTag('devices-catalog')
  }
}

export const revalidateDeviceDelete: CollectionAfterDeleteHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(CATALOG_PATH)
    revalidateTag('devices-catalog')
  }
}
