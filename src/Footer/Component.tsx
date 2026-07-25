import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import type { Footer, Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { ScrollToTopButton, ScrollToTopButtonMobile } from './ScrollToTopButton'
import { FooterServicesGrid } from './ServicesGrid'
import Link from 'next/link'

interface ServicePageData {
  id: string
  slug: string
  title: string
  serviceCategory: 'infrastructure' | 'digital'
  parentService: string | null
}

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  const navItems = footerData?.navItems || []
  const description = footerData?.description
  const contactInfo = footerData?.contactInfo
  const bottomBar = footerData?.bottomBar
  const logo = footerData?.logo

  const payload = await getPayload({ config: configPromise })
  const servicePagesRes = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 300,
    where: {
      and: [
        { serviceCategory: { in: ['infrastructure', 'digital'] } },
        { _status: { equals: 'published' } },
      ],
    },
  })

  const servicePages: ServicePageData[] = (servicePagesRes.docs as Page[])
    .filter((p) => p.slug && p.serviceCategory && p.serviceCategory !== 'none')
    .map((p) => ({
      id: p.id,
      slug: p.slug as string,
      title: p.title,
      serviceCategory: p.serviceCategory as 'infrastructure' | 'digital',
      parentService:
        typeof p.parentService === 'object' && p.parentService
          ? p.parentService.id
          : (p.parentService as string | null) || null,
    }))

  const parentServices = servicePages.filter((p) => !p.parentService)
  const subServices = servicePages.filter((p) => p.parentService)
  const subServicesByParent: Record<string, ServicePageData[]> = {}
  for (const sub of subServices) {
    const key = sub.parentService as string
    if (!subServicesByParent[key]) subServicesByParent[key] = []
    subServicesByParent[key].push(sub)
  }

  return (
    <footer className="bg-primary_red text-white relative">
      {/* Main Footer Content */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo href="/" logo={logo} width={180} height={58} alt="Company Logo" variant="white" />
            </div>
            <p className="text-white/75 text-sm leading-relaxed max-w-sm">{description}</p>
          </div>

          {/* Quick Links */}
          {navItems.length > 0 && (
            <div className="lg:col-span-4">
              <h3 className="inline-block text-xs font-semibold text-white uppercase tracking-wide mb-6 pb-2 border-b border-white/30">
                Quick Links
              </h3>
              <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    className="text-white/80 hover:text-white hover:underline transition-colors text-sm"
                    {...link}
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="inline-block text-xs font-semibold text-white uppercase tracking-wide mb-6 pb-2 border-b border-white/30">
              Get In Touch
            </h3>
            <div className="space-y-5 text-sm">
              <a
                href={`tel:${contactInfo?.phone}`}
                className="block text-lg font-semibold text-white hover:underline transition-colors"
              >
                {contactInfo?.phone}
              </a>
              <a
                href={`mailto:${contactInfo?.email}`}
                className="block text-white/80 hover:text-white hover:underline transition-colors"
              >
                {contactInfo?.email}
              </a>
              <div className="text-white/75 leading-relaxed">
                <p>{contactInfo?.address?.companyName}</p>
                <p>{contactInfo?.address?.building}</p>
                <p>{contactInfo?.address?.poBox}</p>
              </div>
              <div className="text-white/75">
                <span className="text-white/60">{contactInfo?.workingHours?.days}</span>
                {' — '}
                {contactInfo?.workingHours?.time}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Services (parent services only; sub-services reveal on hover/tap) */}
      {parentServices.length > 0 && (
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-t border-white/20 pt-12">
          <h3 className="inline-block text-xs font-semibold text-white uppercase tracking-wide mb-8 pb-2 border-b border-white/30">
            All Services
          </h3>
          <FooterServicesGrid parents={parentServices} subsByParent={subServicesByParent} />
        </div>
      )}

      {/* Bottom Bar */}
      <div className="grid gap-8 md:gap-4 max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 border-t border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ScrollToTopButton />

          <div className="hidden md:block text-white/70 mt-auto text-sm">
            {bottomBar?.copyrightText}
          </div>
        </div>

        <Link href="/services">
          <div className="w-full relative overflow-hidden active:scale-[0.995] transition-all">
            {bottomBar?.exploreServicesImage ? (
              <Media
                resource={bottomBar.exploreServicesImage}
                imgClassName="w-full h-[80px] lg:h-[120px] rounded-xl object-cover"
              />
            ) : (
              <div className="w-full h-26 rounded-xl bg-foreground"></div>
            )}

            <div className="absolute inset-0 flex items-center justify-between gap-5 px-5 sm:px-10 xl:px-14">
              <span>{bottomBar?.exploreServicesText}</span>
              <div className="rotate-45">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 16L7 2M7 2L1 8M7 2L13 8" stroke="#ECEEEC" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <div className="md:hidden flex justify-between">
          <div className="text-white/70 mt-auto text-sm">{bottomBar?.copyrightText}</div>
          <ScrollToTopButtonMobile />
        </div>
      </div>
    </footer>
  )
}
