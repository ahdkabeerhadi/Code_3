import type { Metadata } from 'next'
import { BrandDevicesPageContent, brandPageMetadata } from '@/components/DeviceCatalog/BrandDevicesPage'

export default function Page() {
  return <BrandDevicesPageContent brand="Yealink" />
}

export function generateMetadata(): Metadata {
  return brandPageMetadata('Yealink')
}
