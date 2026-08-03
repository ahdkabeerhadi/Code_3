import localFont from 'next/font/local'
import { Noto_Sans_Arabic } from 'next/font/google'

export const caMechano = localFont({
  src: '../public/fonts/camechano-condensed.woff2',
  variable: '--font-ca-mechano',
  display: 'swap',
})

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})