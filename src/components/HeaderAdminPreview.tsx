'use client'

import React from 'react'
import { ChevronDown, ExternalLink, Home, Settings, Menu } from 'lucide-react'
import { Button } from './ui/button'

interface NavItem {
  label: string
  link: string
  type?: 'internal' | 'external' | 'anchor' | 'dropdown' | 'mega'
  icon?: string
  showInMobile?: boolean
  showInDesktop?: boolean
  order?: number
  subItems?: NavItem[]
  description?: string
}

interface HeaderPreviewProps {
  navItems?: NavItem[]
  logo?: string | { url?: string }
  settings?: {
    stickyHeader?: boolean
    showSearchIcon?: boolean
    mobileMenuStyle?: string
  }
  ctaButtons?: {
    showContactButton?: boolean
    showLoginButton?: boolean
    contactText?: string
    loginText?: string
    contactLink?: string
    loginLink?: string
    buttonStyle?: string
  }
}

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  settings: Settings,
  menu: Menu,
  external: ExternalLink,
}

const DynamicIcon = ({ name, className = 'w-4 h-4' }: { name?: string; className?: string }) => {
  if (!name) return null

  const IconComponent = IconMap[name]
  if (!IconComponent) return null

  return <IconComponent className={className} />
}

const NavItemPreview = ({ item, isMobile = false }: { item: NavItem; isMobile?: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.type === 'dropdown' || item.type === 'mega') {
    return (
      <div className="relative">
        <button
          className={`flex items-center gap-2 px-3 py-2 text-sm ${
            isMobile ? 'text-white' : 'text-gray-700 hover:text-red-600'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.icon && <DynamicIcon name={item.icon} className="w-3 h-3" />}
          {item.label}
          <ChevronDown className="w-3 h-3" />
        </button>

        {isOpen && (
          <div
            className={`absolute top-full left-0 z-10 ${
              isMobile ? 'relative w-full' : 'min-w-48 bg-white shadow-lg rounded-md border p-2'
            }`}
          >
            {item.subItems?.map((subItem, index) => (
              <a
                key={index}
                href={subItem.link}
                className={`block ${
                  isMobile
                    ? 'text-sm py-1 text-white'
                    : 'px-3 py-2 text-sm hover:bg-gray-100 rounded'
                }`}
              >
                <div className="flex items-center gap-2">
                  {subItem.icon && <DynamicIcon name={subItem.icon} className="w-3 h-3" />}
                  <div>
                    <div className="font-medium">{subItem.label}</div>
                    {subItem.description && (
                      <div className="text-xs text-gray-500">{subItem.description}</div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <a
      href={item.link}
      className={`flex items-center gap-2 px-3 py-2 text-sm ${
        isMobile ? 'text-white' : 'text-gray-700 hover:text-red-600'
      }`}
    >
      {item.icon && <DynamicIcon name={item.icon} className="w-3 h-3" />}
      {item.label}
    </a>
  )
}

export const HeaderAdminPreview: React.FC<HeaderPreviewProps> = ({
  navItems = [],
  logo,
  settings,
  ctaButtons,
}) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)

  const sortedNavItems = navItems
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .filter((item) => item.showInDesktop !== false)

  const mobileNavItems = navItems
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .filter((item) => item.showInMobile !== false)

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-semibold mb-4">Header Preview</h3>

      {/* Desktop Header Preview */}
      <div className="hidden md:block border-b pb-4 mb-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {logo ? (
              <div className="w-24 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                Logo
              </div>
            ) : (
              <div className="w-24 h-8 bg-red-100 rounded flex items-center justify-center text-xs text-red-600">
                CODE3
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {sortedNavItems.map((item, index) => (
              <NavItemPreview key={index} item={item} />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-2">
            {settings?.showSearchIcon && (
              <Button className="p-2 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            )}
            {ctaButtons?.showContactButton !== false && (
              <a
                href={ctaButtons?.contactLink || '/contact'}
                className="text-sm hover:text-red-600"
              >
                {ctaButtons?.contactText || 'Contact'}
              </a>
            )}
            {ctaButtons?.showLoginButton !== false && (
              <button
                className={`px-3 py-1 text-sm text-white ${
                  ctaButtons?.buttonStyle === 'rounded'
                    ? 'rounded-lg'
                    : ctaButtons?.buttonStyle === 'pill'
                      ? 'rounded-full'
                      : ctaButtons?.buttonStyle === 'outline'
                        ? 'border border-black bg-transparent text-black'
                        : 'rounded'
                } bg-black`}
              >
                {ctaButtons?.loginText || 'Login'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header Preview */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {logo ? (
              <div className="w-20 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                Logo
              </div>
            ) : (
              <div className="w-20 h-6 bg-red-100 rounded flex items-center justify-center text-xs text-red-600">
                CODE3
              </div>
            )}
          </div>
          <Button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {showMobileMenu && (
          <div className="bg-gray-100 rounded p-3 space-y-2">
            {mobileNavItems.map((item, index) => (
              <NavItemPreview key={index} item={item} isMobile={true} />
            ))}

            <div className="flex space-x-2 pt-2 border-t">
              {ctaButtons?.showLoginButton !== false && (
                <button className="px-3 py-1 text-xs bg-black text-white rounded">
                  {ctaButtons?.loginText || 'Login'}
                </button>
              )}
              {ctaButtons?.showContactButton !== false && (
                <button className="px-3 py-1 text-xs border border-gray-300 rounded">
                  {ctaButtons?.contactText || 'Contact'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Settings Summary */}
      <div className="text-xs text-gray-500 mt-2">
        <div>Sticky: {settings?.stickyHeader ? 'Yes' : 'No'}</div>
        <div>Search Icon: {settings?.showSearchIcon ? 'Yes' : 'No'}</div>
        <div>Mobile Style: {settings?.mobileMenuStyle || 'fullscreen'}</div>
      </div>
    </div>
  )
}
