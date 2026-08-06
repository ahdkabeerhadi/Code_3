'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect } from 'react'

export function SetLightHeader() {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return null
}
