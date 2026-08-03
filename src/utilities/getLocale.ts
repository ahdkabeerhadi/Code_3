import { headers } from 'next/headers'

export type Locale = 'en' | 'ar'

export async function getLocale(): Promise<Locale> {
  const headersList = await headers()
  return headersList.get('x-locale') === 'ar' ? 'ar' : 'en'
}
