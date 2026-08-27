import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { DeviceCartProvider } from './DeviceCart'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <DeviceCartProvider>{children}</DeviceCartProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
