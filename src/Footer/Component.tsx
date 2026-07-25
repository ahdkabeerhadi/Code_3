import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { ScrollToTopButton, ScrollToTopButtonMobile } from './ScrollToTopButton'
import Link from 'next/link'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  const navItems = footerData?.navItems || []
  const description = footerData?.description
  const contactInfo = footerData?.contactInfo
  const bottomBar = footerData?.bottomBar
  const logo = footerData?.logo

  return (
    <footer className="bg-black text-white relative">
      {/* Main Footer Content */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo href="/" logo={logo} width={180} height={58} alt="Company Logo" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{description}</p>
          </div>

          {/* Quick Links */}
          {navItems.length > 0 && (
            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-6">
                Quick Links
              </h3>
              <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    className="text-gray-300 hover:text-primary_red transition-colors text-sm"
                    {...link}
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-6">
              Get In Touch
            </h3>
            <div className="space-y-5 text-sm">
              <a
                href={`tel:${contactInfo?.phone}`}
                className="block text-lg font-semibold text-white hover:text-primary_red transition-colors"
              >
                {contactInfo?.phone}
              </a>
              <a
                href={`mailto:${contactInfo?.email}`}
                className="block text-gray-300 hover:text-primary_red transition-colors"
              >
                {contactInfo?.email}
              </a>
              <div className="text-gray-400 leading-relaxed">
                <p>{contactInfo?.address?.companyName}</p>
                <p>{contactInfo?.address?.building}</p>
                <p>{contactInfo?.address?.poBox}</p>
              </div>
              <div className="text-gray-400">
                <span className="text-gray-500">{contactInfo?.workingHours?.days}</span>
                {' — '}
                {contactInfo?.workingHours?.time}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="grid gap-8 md:gap-4 max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ScrollToTopButton />

          <div className="hidden md:block text-gray-500 mt-auto text-sm">
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
              <div className="w-full h-26 rounded-xl bg-red-800"></div>
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
          <div className="text-gray-500 mt-auto text-sm">{bottomBar?.copyrightText}</div>
          <ScrollToTopButtonMobile />
        </div>
      </div>
    </footer>
  )
}
