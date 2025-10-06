'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

interface HeaderClientProps {
  data: Header
  navigationPages?: any[]
}

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-medium focus:outline-none"
      >
        <span className="text-base font-semibold text-white">{title}</span>
        <span className="ml-2 font-bold text-white">{open ? '-' : '+'}</span>
      </button>
      {open && <div className="pl-4 mt-1 text-sm space-y-1 text-white">{children}</div>}
    </div>
  )
}

function MenuItem({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="block py-1 text-white">
      {children}
    </a>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, navigationPages = [] }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Extract data from CMS
  const logo = data?.logo
  const megaMenu = data?.megaMenu
  const mobileMenu = data?.mobileMenu
  const ctaButtons = data?.ctaButtons

  // Merge CMS navigation items with auto-generated ones
  const allNavItems = [...(data?.navItems || []), ...navigationPages]

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="bg-white w-full  z-50 lg:px-16 lg:py-6 md:py-4 fixed"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="w-full mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" aria-label="Homepage">
            <Logo loading="eager" priority="high" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          <Link href="/about-us" className="hover:text-red-600 transition">
            About Us
          </Link>
          {/* 
          <div
            className=""
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <button className="hover:text-red-600 flex items-center">
              Digital services <span className="ml-1">+</span>
            </button>
            {showMegaMenu && (
              <div className="absolute left-0 lg:top-24 top-20 w-screen bg-gradient-to-br from-[#b0182a] to-[#45060a] text-white p-12 z-50">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
                  <div className="">
                    <h2 className="text-white font-bold text-xl mb-12">
                      {megaMenu?.title ||
                        'Complete IT, Security & Digital Solutions for Businesses in UAE'}
                    </h2>
                    <span
                      className="mt-10 text-6xl font-bold tracking-widest"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {megaMenu?.brandText || 'CODE3'}
                    </span>
                  </div>
                  <div></div>
                  {megaMenu?.serviceCategories?.slice(0, 3).map((category: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-bold mb-2 text-white">{category.title}</h4>
                      <ul className="space-y-1 text-sm">
                        {category.services?.map((service: any, serviceIndex: number) => (
                          <li key={serviceIndex}>
                            {service.link ? (
                              <a href={service.link} className="hover:text-gray-300">
                                {service.name}
                              </a>
                            ) : (
                              service.name
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {megaMenu?.serviceCategories && megaMenu.serviceCategories.length > 3 && (
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12 mt-8">
                    <div></div>
                    {megaMenu.serviceCategories.slice(3, 6).map((category: any, index: number) => (
                      <div key={index}>
                        <h4 className="font-bold mb-2 text-white">{category.title}</h4>
                        <ul className="space-y-1 text-sm">
                          {category.services?.map((service: any, serviceIndex: number) => (
                            <li key={serviceIndex}>
                              {service.link ? (
                                <a href={service.link} className="hover:text-gray-300">
                                  {service.name}
                                </a>
                              ) : (
                                service.name
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div> */}
          {/* 
          <Link href="/infra-services" className="hover:text-red-600 transition">
            Infra Services
          </Link> */}
          <Link href="/careers" className="hover:text-red-600 transition">
            Careers
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href={ctaButtons?.contactLink || '/contact'}
            className="hidden md:block"
          >
            <Button variant="default" type='button'>{ctaButtons?.contactText || 'Contact'}</Button>
          </Link>
          {/* <button className="ml-4 bg-black text-white px-4 py-1 rounded-full">
            {ctaButtons?.loginText || 'Login'}
          </button> */}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={showMobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col "
          style={{
            background: 'linear-gradient(135deg,#d7213c 0%,#2d0e0e 100%)',
          }}
        >
          {/* Top bar: logo + close */}
          <div className="w-full mx-auto px-4 flex justify-between items-center bg-white z-50 h-16">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Logo loading="eager" priority="high" />
              </Link>
            </div>
            <button
              aria-label="Close menu"
              onClick={() => setShowMobileMenu(false)}
              className="text-gray-700 text-3xl absolute right-4 top-3"
            >
              &times;
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col justify-start px-4 py-6 text-white space-y-2 overflow-auto">
            {/* Dynamic Navigation Items for Mobile */}
            {allNavItems
              .filter((item: any) => item.showInMobile !== false)
              .map((item: any, index: number) => (
                <Link key={index} href={item.link} className="mb-3 text-base font-semibold">
                  {item.label}
                </Link>
              ))}

            {/* Fallback Navigation Items for Mobile */}
            {allNavItems.length === 0 && (
              <>
                <Link href="/about-us" className="mb-3 text-base font-semibold">
                  About Us
                </Link>
                <Link href="/infra-services" className="mb-3 text-base font-semibold">
                  Infra Services
                </Link>
                <Link href="/careers" className="mb-3 text-base font-semibold">
                  Careers
                </Link>
              </>
            )}

            {/* Mobile Menu Sections */}
            {mobileMenu?.sections?.map((section: any, index: number) => (
              <MenuSection key={index} title={section.title}>
                {section.items?.map((item: any, itemIndex: number) => (
                  <MenuItem key={itemIndex}>
                    {item.link ? <a href={item.link}>{item.name}</a> : item.name}
                  </MenuItem>
                ))}
              </MenuSection>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 px-4 pb-6 mt-auto">
            <button className="px-5 py-2 rounded-full bg-white text-black font-semibold shadow">
              {ctaButtons?.loginText || 'Login'}
            </button>
            <Link
              href={ctaButtons?.contactLink || '/contact'}
              className="px-5 py-2 rounded-full border border-white text-white font-semibold"
            >
              {ctaButtons?.contactText || 'Contact'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
