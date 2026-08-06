import type { Metadata } from 'next'
import { BrandDevicesPageContent, brandPageMetadata } from '@/components/DeviceCatalog/BrandDevicesPage'

export default function Page() {
  return <BrandDevicesPageContent brand="Logitech" />
}

export function generateMetadata(): Metadata {
  return brandPageMetadata('Logitech')
}
