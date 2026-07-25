import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { getGoogleReviews } from './getGoogleReviews'

type Props = {
  className?: string
} & TestimonialsBlockProps

const FALLBACK_QUOTES = [
  {
    quote:
      'CODE3 has been a reliable technology partner for our organization. Their proactive approach and rapid response significantly improved the stability of our IT environment.',
    name: 'IT Manager',
    role: 'UAE-Based Enterprise',
  },
  {
    quote:
      'The team demonstrated exceptional professionalism throughout the project. From consultation to implementation, every stage was delivered efficiently and exceeded expectations.',
    name: 'Operations Manager',
    role: 'Retail Sector',
  },
  {
    quote:
      "CODE3's expertise in IT infrastructure and cybersecurity has strengthened our technology environment while ensuring uninterrupted business operations.",
    name: 'Director',
    role: 'Healthcare Organization',
  },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? '#FBBC05' : 'none'}
      stroke={filled ? '#FBBC05' : '#D4D4D8'}
      strokeWidth="1.5"
      className="h-4 w-4"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.8L12 2.5z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4 flex-none">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

export const TestimonialsBlock: React.FC<Props> = async ({
  className,
  badge = 'CLIENT VOICES',
  title,
  useGoogleReviews = true,
  fallbackQuotes,
}) => {
  const googleReviews = useGoogleReviews ? await getGoogleReviews() : null

  const cards: { quote: string; name: string; role: string; rating?: number; isGoogle?: boolean }[] =
    googleReviews
      ? googleReviews.map((r) => ({
          quote: r.text,
          name: r.author_name,
          role: r.relative_time_description || '',
          rating: r.rating,
          isGoogle: true,
        }))
      : fallbackQuotes && fallbackQuotes.length > 0
        ? fallbackQuotes
        : FALLBACK_QUOTES

  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((t, i) => (
            <div
              key={t.name + i}
              className="rounded-2xl border border-border bg-white p-7 transition-shadow duration-300 hover:shadow-lg"
            >
              {typeof t.rating === 'number' ? (
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} filled={j < Math.round(t.rating as number)} />
                  ))}
                </div>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 mb-4 text-primary_red/70">
                  <path d="M7 8c-2.5 0-4.5 2-4.5 4.5S4.5 17 7 17c.4 0 .8-.1 1.1-.2C7.4 19 5.6 20.5 3 21l.6 1.8C8 21.8 11 18.4 11 13.5 11 10.5 9.5 8 7 8zm10 0c-2.5 0-4.5 2-4.5 4.5S14.5 17 17 17c.4 0 .8-.1 1.1-.2-.7 2.2-2.5 3.7-5.1 4.2l.6 1.8c4.4-1 7.4-4.4 7.4-9.3 0-3-1.5-5.5-4-5.5z" />
                </svg>
              )}
              <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-foreground text-xs font-semibold text-white">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  {t.isGoogle ? (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {t.role && <span>{t.role}</span>}
                      {t.role && <span>·</span>}
                      <GoogleIcon />
                      <span>Google Review</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">{t.role}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
