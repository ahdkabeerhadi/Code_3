import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getSiteVerification } from '@/utilities/getSiteVerification'
import { getLocale } from '@/utilities/getLocale'
import { draftMode } from 'next/headers'
import { caMechano, notoSansArabic } from '@/fonts'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PhoneButton } from '@/components/PhoneButton'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WJKX5PV5'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const locale = await getLocale()
  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, caMechano.variable, notoSansArabic.variable)}
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <GoogleTagManager gtmId={GTM_ID} />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          {children}
          <Footer />
          <PhoneButton />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  verification: getSiteVerification(),
}
