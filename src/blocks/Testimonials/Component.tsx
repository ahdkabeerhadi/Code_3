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
      fill={filled ? '#DF3341' : 'none'}
      stroke={filled ? '#DF3341' : '#D4D4D8'}
      strokeWidth="1.5"
      className="h-4 w-4"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.8L12 2.5z" />
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

  const cards: { quote: string; name: string; role: string; rating?: number }[] = googleReviews
    ? googleReviews.map((r) => ({
        quote: r.text,
        name: r.author_name,
        role: r.relative_time_description
          ? `${r.relative_time_description} · Google Review`
          : 'Google Review',
        rating: r.rating,
      }))
    : (fallbackQuotes && fallbackQuotes.length > 0 ? fallbackQuotes : FALLBACK_QUOTES)

  return (
    <section className={cn('bg-white py-16 md:py-24', className)}>
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
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
