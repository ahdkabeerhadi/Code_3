'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect, useRef } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(() => searchParams.get('q') || '')
  const router = useRouter()
  const isFirstRun = useRef(true)

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Skip the effect on mount so an incoming `?q=` from a direct link or
    // header search isn't immediately overwritten by the initial (empty
    // until debounced) local state.
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          defaultValue={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
