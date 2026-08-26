'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'

import type { Header } from '@/payload-types'
import type { DeviceCardData } from './Component'

import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { CalendlyButton } from './CalendlyButton'
import { ServiceIcon } from '@/components/site/icons'

interface NavigationPageData {
  id: string
  slug: string | null | undefined
  title: string
  serviceCategory: 'none' | 'infrastructure' | 'digital' | null | undefined
  parentService: string | null
  isSubService: boolean
  icon: string
  description: string | null
}

interface TechPartnerData {
  name: string
  logoUrl?: string | null
}

const DEVICE_BRANDS = ['Yealink', 'Logitech', 'Jabra', 'Cisco', 'Poly'] as const

interface HeaderClientProps {
  data: Header
  navigationPages?: NavigationPageData[]
  techPartners?: TechPartnerData[]
  devicesByBrand?: Record<string, DeviceCardData[]>
}

interface NavigationItem {
  id?: string | null
  label: string
  link: string
  type?: 'link' | 'dropdown' | 'mega' | 'anchor' | 'internal' | 'external' | null
  openInNewTab?: boolean | null
  order?: number | null
  subItems?: SubNavigationItem[] | null
}

interface SubNavigationItem {
  label: string
  link: string
  icon?: string | null
  description?: string | null
  openInNewTab?: boolean | null
}

const NavDropdown = ({
  item,
  isOpen,
  onToggle,
  onClose,
  techPartners = [],
}: {
  item: NavigationItem
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  techPartners?: TechPartnerData[]
}) => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  const subItems = item.subItems || []
  if (subItems.length === 0) return null

  const hasTechPartnersPanel =
    techPartners.length > 0 &&
    subItems.some((s) => s.label.trim().toLowerCase() === 'technology partners')
  const showPartnersGrid = hasTechPartnersPanel && hoveredLabel?.trim().toLowerCase() === 'technology partners'

  return (
    <div className="relative">
      <button onClick={onToggle} className="hover:text-red-600 transition flex items-center gap-1">
        {item.label}
        <span className="text-xl font-bold transition-transform duration-300">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen &&
        (hasTechPartnersPanel ? (
          <div className="absolute left-1/2 top-full z-20 mt-3 flex -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
            <div className="w-56 flex-none bg-foreground py-3" onMouseLeave={() => setHoveredLabel(null)}>
              {subItems.map((sub, i) => (
                <Link
                  key={i}
                  href={sub.link}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredLabel(sub.label)}
                  {...(sub.openInNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
                  className={`group flex items-center justify-between px-5 py-3 text-sm font-medium transition-colors ${
                    sub.label.trim().toLowerCase() === 'technology partners' && hoveredLabel === sub.label
                      ? 'bg-primary_red text-white'
                      : 'text-white/90 hover:bg-primary_red hover:text-white'
                  }`}
                >
                  {sub.label}
                  <span
                    className={`transition-opacity ${
                      sub.label.trim().toLowerCase() === 'technology partners'
                        ? hoveredLabel === sub.label
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
            {showPartnersGrid && (
              <div className="w-[34rem] flex-none p-5">
                <div className="grid grid-cols-6 gap-2">
                  {techPartners.map((p, i) => (
                    <div
                      key={i}
                      className="flex h-14 items-center justify-center rounded-md border border-border bg-white p-1.5 transition-all duration-200 hover:scale-105 hover:border-primary_red/40 hover:shadow-sm"
                    >
                      {p.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.logoUrl}
                          alt={p.name}
                          className="h-8 w-auto max-w-full object-contain grayscale transition-all duration-200 hover:grayscale-0"
                        />
                      ) : (
                        <span className="text-center text-[10px] font-bold leading-tight text-black">
                          {p.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  href="/technology-partners"
                  onClick={onClose}
                  className="mt-4 inline-block text-xs font-semibold text-primary_red hover:underline"
                >
                  View all technology partners →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-xl border border-border bg-white py-2 shadow-lg">
            {subItems.map((sub, i) => (
              <Link
                key={i}
                href={sub.link}
                onClick={onClose}
                {...(sub.openInNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
                className="block px-4 py-2 text-sm text-foreground hover:bg-gray-50 hover:text-red-600 transition"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        ))}
    </div>
  )
}

function LocaleToggle({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const isArabic = pathname === '/ar' || pathname.startsWith('/ar/')
  const enPath = isArabic ? pathname.replace(/^\/ar/, '') || '/' : pathname
  const arPath = isArabic ? pathname : `/ar${pathname === '/' ? '' : pathname}`

  return (
    <div
      className={`inline-flex items-center rounded-full border border-foreground bg-background p-0.5 text-xs font-semibold sm:text-sm ${className}`}
    >
      {/* Plain <a> tags (not next/link) so switching locale always forces a full
          page navigation. Middleware rewrites both /ar and non-/ar paths to the
          same underlying route, so Next's client-side soft navigation can reuse
          the previous locale's cached RSC payload and appear "stuck" until a
          hard reload — this sidesteps that entirely. */}
      <a
        href={enPath}
        data-locale-link="en"
        aria-current={!isArabic ? 'page' : undefined}
        aria-label="Switch to English"
        className={`rounded-full px-3 py-1 transition-all duration-300 ${
          !isArabic ? 'bg-primary_red text-white' : 'text-foreground hover:text-primary_red'
        }`}
      >
        EN
      </a>
      <a
        href={arPath}
        aria-current={isArabic ? 'page' : undefined}
        aria-label="التبديل إلى العربية"
        className={`rounded-full px-3 py-1 transition-all duration-300 ${
          isArabic ? 'bg-primary_red text-white' : 'text-foreground hover:text-primary_red'
        }`}
      >
        العربية
      </a>
    </div>
  )
}

const HeaderSearchBox = ({ className = 'w-28 lg:w-36' }: { className?: string }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={onSubmit} className={`flex items-center rounded-full border border-border bg-white ${className}`}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search"
        className="w-full min-w-0 flex-1 bg-transparent px-4 py-1.5 text-sm text-foreground outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="flex-none pe-3 text-gray-500 hover:text-red-600 transition"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  )
}

const getServiceLink = (page: NavigationPageData): string => {
  if (!page.slug) return '#'
  
  if (page.serviceCategory && page.serviceCategory !== 'none') {
    return `/service/${page.slug}`
  }
  
  return `/${page.slug}`
}

const NavItem = ({ item, isMobile = false }: { item: NavigationItem; isMobile?: boolean }) => {
  const linkProps = {
    href: item.link,
    ...(item.openInNewTab && { target: '_blank', rel: 'noopener noreferrer' }),
    className: `flex items-center gap-2 ${
      isMobile ? 'text-base font-semibold py-2' : 'hover:text-red-600 transition'
    }`,
  }

  return (
    <Link {...linkProps}>
      {item.label}
    </Link>
  )
}

const MobileServiceSection = ({
  title,
  pages,
  subServices,
  getSubServices,
  onLinkClick,
  expandedServices,
  setExpandedServices,
}: {
  title: string
  pages: NavigationPageData[]
  subServices: NavigationPageData[]
  getSubServices: (parentId: string, subServices: NavigationPageData[]) => NavigationPageData[]
  onLinkClick: () => void
  expandedServices: Map<string, Set<string>>
  setExpandedServices: React.Dispatch<React.SetStateAction<Map<string, Set<string>>>>
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleService = (serviceId: string) => {
    const newExpanded = new Map(expandedServices)
    const currentSectionServices = newExpanded.get(title) || new Set<string>()

    if (currentSectionServices.has(serviceId)) {
      currentSectionServices.delete(serviceId)
    } else {
  
      currentSectionServices.clear()
      currentSectionServices.add(serviceId)
    }

    newExpanded.set(title, currentSectionServices)
    setExpandedServices(newExpanded)
  }

  return (
    <div className="w-full pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-start focus:outline-none transition-all duration-300"
      >
        <span className="text-lg font-semibold text-white">{title}</span>
        <span className="ms-2 text-2xl font-bold text-white transition-transform duration-300">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3">
          {pages
            .filter((page: NavigationPageData) => page && page.id && page.slug)
            .map((page: NavigationPageData) => {
              const pageSubs = getSubServices(page.id, subServices)
              const hasSubServices = pageSubs.length > 0
              const currentSectionServices = expandedServices.get(title) || new Set<string>()
              const isExpanded = currentSectionServices.has(page.id)

              return (
                <div key={page.id} className="space-y-2">
                  <div className="flex items-center justify-between ms-4">
                    <Link
                      href={getServiceLink(page)}
                      className="text-white font-medium transition-colors duration-300 flex-1"
                      onClick={onLinkClick}
                    >
                      {page.title}
                    </Link>
                    {hasSubServices && (
                      <button
                        onClick={() => toggleService(page.id)}
                        className="ms-2 text-xl font-bold text-white transition-transform duration-300"
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {hasSubServices && (
                      <ul className="ms-8 space-y-2">
                        {pageSubs
                          .filter((sub: NavigationPageData) => sub && sub.id && sub.slug)
                          .map((sub: NavigationPageData) => (
                            <li key={sub.id}>
                              <Link
                                href={getServiceLink(sub)}
                                className="text-white/80 text-md transition-colors duration-300 block"
                                onClick={onLinkClick}
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  data,
  navigationPages = [],
  techPartners = [],
  devicesByBrand = {},
}) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [showInfraMegaMenu, setShowInfraMegaMenu] = useState(false)
  const [activeInfraCategory, setActiveInfraCategory] = useState(0)
  const [showProductsMenu, setShowProductsMenu] = useState(false)
  const [activeProductBrand, setActiveProductBrand] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const [openMobileDropdownIndex, setOpenMobileDropdownIndex] = useState<number | null>(null)
  const [expandedServices, setExpandedServices] = useState<Map<string, Set<string>>>(new Map())

  const logo = data?.logo
  const links = data?.links
  const calendlyUrl = data?.calendlyUrl

  const allNavItems = (data?.navItems || []).sort((a: NavigationItem, b: NavigationItem) => (a.order || 0) - (b.order || 0))

  const servicePages = navigationPages as NavigationPageData[]
  const infraPages = servicePages.filter(
    (p: NavigationPageData) => p.serviceCategory === 'infrastructure' && !p.isSubService,
  )
  const infraSubServices = servicePages.filter(
    (p: NavigationPageData) => p.serviceCategory === 'infrastructure' && p.isSubService,
  )

  const getSubServices = (
    parentId: string,
    subServices: NavigationPageData[],
  ): NavigationPageData[] => {
    return subServices.filter((sub: NavigationPageData) => {
      return sub.parentService === parentId
    })
  }

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
  }, [headerTheme, theme])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowInfraMegaMenu(false)
        setShowProductsMenu(false)
        setOpenDropdownIndex(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    setShowInfraMegaMenu(false)
    setShowProductsMenu(false)
    setOpenDropdownIndex(null)
    setActiveInfraCategory(0)
    setActiveProductBrand(0)
  }, [pathname])

  const closeMobileMenu = () => {
    setShowMobileMenu(false)
  }

  const toggleInfraMegaMenu = () => {
    setShowInfraMegaMenu(!showInfraMegaMenu)
    setShowProductsMenu(false)
    setOpenDropdownIndex(null)
  }

  const toggleProductsMenu = () => {
    setShowProductsMenu(!showProductsMenu)
    setShowInfraMegaMenu(false)
    setOpenDropdownIndex(null)
  }

  return (
    <>
      <header
        className={`bg-white/80 w-full backdrop-blur-lg max-w-[2000px] mx-auto z-50 lg:py-6 py-4 sticky top-9`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div
          className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8`}
        >
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 w-[8rem] lg:w-[10rem]">
            <Logo
              logo={logo}
              href="/"
              width={100}
              height={69}
              loading="eager"
              priority="high"
              alt="Company Logo"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-1 min-w-0 justify-center space-x-5 rtl:space-x-reverse items-center">
            {/* Dynamic Navigation Items */}
            {allNavItems.map((item: NavigationItem, index: number) =>
              item.type === 'dropdown' ? (
                <NavDropdown
                  key={index}
                  item={item}
                  isOpen={openDropdownIndex === index}
                  onToggle={() => {
                    setOpenDropdownIndex(openDropdownIndex === index ? null : index)
                    setShowInfraMegaMenu(false)
                  }}
                  onClose={() => setOpenDropdownIndex(null)}
                  techPartners={techPartners}
                />
              ) : (
                <NavItem key={index} item={item} />
              ),
            )}

            {/* Infra Services Button with +/- icon */}
            {infraPages.length > 0 && (
              <button
                onClick={toggleInfraMegaMenu}
                className="hover:text-red-600 transition flex items-center gap-1 whitespace-nowrap"
              >
                IT Infra Services
                <span className="text-xl font-bold transition-transform duration-300">
                  {showInfraMegaMenu ? '−' : '+'}
                </span>
              </button>
            )}

            {/* Products Button with +/- icon */}
            {DEVICE_BRANDS.some((b) => (devicesByBrand[b] || []).length > 0) && (
              <button
                onClick={toggleProductsMenu}
                className="hover:text-red-600 transition flex items-center gap-1 whitespace-nowrap"
              >
                Products
                <span className="text-xl font-bold transition-transform duration-300">
                  {showProductsMenu ? '−' : '+'}
                </span>
              </button>
            )}

            <HeaderSearchBox />

            {/* Fallback Navigation Items */}
            {allNavItems.length === 0 && (
              <>
                <Link href="/about-us" className="hover:text-red-600 transition">
                  About Us
                </Link>
                <Link href="/careers" className="hover:text-red-600 transition">
                  Careers
                </Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex flex-shrink-0 items-center gap-3">
            <LocaleToggle />
            {links && links.length > 0 && (
              <div className="flex gap-4 items-center">
                {links.map(({ link }, i) => {
                  if (calendlyUrl && link?.label?.trim().toLowerCase() === "let's keep in touch") {
                    return (
                      <CalendlyButton
                        key={i}
                        label={link.label}
                        url={calendlyUrl}
                        appearance={link.appearance || undefined}
                      />
                    )
                  }
                  return <CMSLink key={i} {...link} />
                })}
              </div>
            )}

          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle menu">
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden fixed inset-0 h-screen z-40">
            <div className="space-y-3 flex flex-col h-full"
              style={{
                  background: 'linear-gradient(-135deg, #8b0f1f 0%, #d7213c 20%, #2d0e0e 100%)',
                }}
            >
              {/* Mobile Logo and Close Button */}
              <div className="px-6 py-3 flex items-center justify-between bg-white">
                <Logo
                  logo={logo}
                  href="/"
                  width={70}
                  height={45}
                  loading="eager"
                  priority="high"
                  alt="Company Logo"
                />
                <button
                  onClick={closeMobileMenu}
                  className="text-black transition-transform duration-300 hover:scale-110"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div
                className="p-6 flex-1 flex flex-col scrollbar-hide overflow-y-auto"
              >
                <HeaderSearchBox className="mb-6 w-full" />
                <LocaleToggle className="mb-6" />

                {/* Dynamic Navigation Items for Mobile */}
                <div className="space-y-2">
                  {allNavItems.map((item: NavigationItem, index: number) =>
                    item.type === 'dropdown' ? (
                      <div key={index} className="pb-2">
                        <button
                          onClick={() =>
                            setOpenMobileDropdownIndex(openMobileDropdownIndex === index ? null : index)
                          }
                          className="flex items-center justify-between w-full text-start text-white text-lg font-semibold py-2"
                        >
                          {item.label}
                          <span className="ms-2 text-2xl font-bold">
                            {openMobileDropdownIndex === index ? '−' : '+'}
                          </span>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            openMobileDropdownIndex === index ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <ul className="ms-4 space-y-3">
                            {(item.subItems || []).map((sub, i) => (
                              <li key={i}>
                                <Link
                                  href={sub.link}
                                  className="text-white/80 text-md block transition-colors duration-300"
                                  onClick={closeMobileMenu}
                                  {...(sub.openInNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="pb-2">
                        <Link
                          href={item.link}
                          className="text-white text-lg font-semibold block transition-colors duration-300"
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                      </div>
                    ),
                  )}
                </div>

                {/* Infra Services Section */}
                {infraPages.length > 0 && (
                  <MobileServiceSection
                    title="IT Infra Services"
                    pages={infraPages}
                    subServices={infraSubServices}
                    getSubServices={getSubServices}
                    onLinkClick={closeMobileMenu}
                    expandedServices={expandedServices}
                    setExpandedServices={setExpandedServices}
                  />
                )}

                {/* Products Section */}
                {DEVICE_BRANDS.some((b) => (devicesByBrand[b] || []).length > 0) && (
                  <MobileProductSection devicesByBrand={devicesByBrand} onLinkClick={closeMobileMenu} />
                )}

                {/* Mobile Contact Button */}
                <div className="pt-4 mt-auto">
                  {links && links.length > 0 && (
                    <div className="flex flex-col gap-4 items-center">
                      {links.map(({ link }, i) => {
                        if (
                          calendlyUrl &&
                          link?.label?.trim().toLowerCase() === "let's keep in touch"
                        ) {
                          return (
                            <div key={i} onClick={closeMobileMenu} className="w-full">
                              <CalendlyButton
                                label={link.label}
                                url={calendlyUrl}
                                appearance={link.appearance || undefined}
                                className="w-full text-center"
                              />
                            </div>
                          )
                        }
                        return (
                          <div key={i} onClick={closeMobileMenu} className="w-full">
                            <CMSLink className="w-full text-center" {...link} />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Infra Services Mega Menu */}
      {showInfraMegaMenu &&
        (() => {
          const validInfraPages = infraPages.filter((page: NavigationPageData) => page && page.id && page.slug)
          const activePage = validInfraPages[activeInfraCategory] || validInfraPages[0]
          const activeSubServices = activePage
            ? getSubServices(activePage.id, infraSubServices).filter(
                (sub: NavigationPageData) => sub && sub.id && sub.slug,
              )
            : []

          return (
            <div
              className="fixed inset-x-0 top-[5rem] z-40 max-h-[calc(100vh-5rem)] overflow-auto text-white"
              style={{ background: 'linear-gradient(-135deg, #8b0f1f 0%, #d7213c 20%, #2d0e0e 100%)' }}
            >
              <div className="max-w-7xl mx-auto px-16 py-12 relative">
                <button
                  type="button"
                  onClick={() => setShowInfraMegaMenu(false)}
                  aria-label="Close menu"
                  className="absolute end-6 top-6 text-white/70 hover:text-white transition"
                >
                  <X className="h-6 w-6" />
                </button>

                <p className="text-sm font-semibold mb-8 text-white/80">
                  Complete IT, Security &amp; Infrastructure Solutions for Businesses in UAE
                </p>

                <div className="flex gap-12">
                  {/* Left rail: parent categories */}
                  <div className="w-64 flex-none border-e border-white/15 pe-6 space-y-1">
                    {validInfraPages.map((page: NavigationPageData, index: number) => {
                      const isActive = index === activeInfraCategory
                      return (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => setActiveInfraCategory(index)}
                          className={`w-full text-start px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                            isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {page.title}
                        </button>
                      )
                    })}
                  </div>

                  {/* Right grid: active category's sub-services */}
                  <div className="flex-1 min-w-0">
                    {activePage && (
                      <Link
                        href={getServiceLink(activePage)}
                        onClick={() => setShowInfraMegaMenu(false)}
                        className="inline-block text-xl font-bold mb-6 hover:text-white/80 transition"
                      >
                        {activePage.title}
                      </Link>
                    )}

                    {activeSubServices.length === 0 ? (
                      <p className="text-sm text-white/60">No sub-services published under this category yet.</p>
                    ) : (
                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {activeSubServices.map((sub: NavigationPageData) => (
                          <Link
                            key={sub.id}
                            href={getServiceLink(sub)}
                            onClick={() => setShowInfraMegaMenu(false)}
                            className="rounded-xl border border-white/15 p-4 transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <span className="h-10 w-10 flex-none rounded-full border-2 border-white/30 bg-white/5 flex items-center justify-center">
                                <ServiceIcon preset={sub.icon} className="h-4.5 w-4.5 text-white" />
                              </span>
                              <h3 className="text-sm font-semibold text-white">{sub.title}</h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

      {/* Products Mega Menu */}
      {showProductsMenu &&
        (() => {
          const activeBrand = DEVICE_BRANDS[activeProductBrand] || DEVICE_BRANDS[0]
          const activeDevices = (devicesByBrand[activeBrand] || []).filter((d) => d && d.id && d.slug)

          return (
            <div
              className="fixed inset-x-0 top-[5rem] z-40 max-h-[calc(100vh-5rem)] overflow-auto text-white"
              style={{ background: 'linear-gradient(-135deg, #8b0f1f 0%, #d7213c 20%, #2d0e0e 100%)' }}
            >
              <div className="max-w-7xl mx-auto px-16 py-12 relative">
                <button
                  type="button"
                  onClick={() => setShowProductsMenu(false)}
                  aria-label="Close menu"
                  className="absolute end-6 top-6 text-white/70 hover:text-white transition"
                >
                  <X className="h-6 w-6" />
                </button>

                <p className="text-sm font-semibold mb-8 text-white/80">
                  Genuine Hardware From Our Trusted Video Conferencing Brands
                </p>

                <div className="flex gap-12">
                  {/* Left rail: brands */}
                  <div className="w-64 flex-none border-e border-white/15 pe-6 space-y-1">
                    {DEVICE_BRANDS.map((brand, index) => {
                      if ((devicesByBrand[brand] || []).length === 0) return null
                      const isActive = index === activeProductBrand
                      return (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => setActiveProductBrand(index)}
                          className={`w-full text-start px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                            isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {brand}
                        </button>
                      )
                    })}
                  </div>

                  {/* Right grid: active brand's devices */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold mb-6">{activeBrand}</h2>

                    {activeDevices.length === 0 ? (
                      <p className="text-sm text-white/60">No products published under this brand yet.</p>
                    ) : (
                      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {activeDevices.map((d) => (
                          <Link
                            key={d.id}
                            href={`/service/device/${d.slug}`}
                            onClick={() => setShowProductsMenu(false)}
                            className="rounded-xl border border-white/15 p-3 transition-colors duration-200 hover:border-white/40 hover:bg-white/5 flex gap-3 items-center"
                          >
                            <span className="h-16 w-16 flex-none rounded-lg bg-white overflow-hidden flex items-center justify-center">
                              {d.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={d.imageUrl} alt={d.title} className="h-full w-full object-contain p-1" />
                              ) : (
                                <span className="text-[10px] font-semibold uppercase text-white/60">{d.brand}</span>
                              )}
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-sm font-semibold text-white truncate">{d.title}</h3>
                              <p className="text-xs text-white/60">
                                {d.brand}
                                {d.roomSize ? ` · ${d.roomSize}` : ''}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

    </>
  )
}

const MobileProductSection = ({
  devicesByBrand,
  onLinkClick,
}: {
  devicesByBrand: Record<string, DeviceCardData[]>
  onLinkClick: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openBrand, setOpenBrand] = useState<number | null>(null)

  return (
    <div className="w-full pb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-start focus:outline-none transition-all duration-300"
      >
        <span className="text-lg font-semibold text-white">Products</span>
        <span className="ms-2 text-2xl font-bold text-white transition-transform duration-300">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3">
          {DEVICE_BRANDS.map((brand, index) => {
            const devices = (devicesByBrand[brand] || []).filter((d) => d && d.id && d.slug)
            if (devices.length === 0) return null
            const isExpanded = openBrand === index

            return (
              <div key={brand} className="space-y-2">
                <div className="flex items-center justify-between ms-4">
                  <span className="text-white font-medium flex-1">{brand}</span>
                  <button
                    onClick={() => setOpenBrand(isExpanded ? null : index)}
                    className="ms-2 text-xl font-bold text-white transition-transform duration-300"
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="ms-8 space-y-2">
                    {devices.map((d) => (
                      <li key={d.id}>
                        <Link
                          href={`/service/device/${d.slug}`}
                          className="text-white/80 text-md transition-colors duration-300 block"
                          onClick={onLinkClick}
                        >
                          {d.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
