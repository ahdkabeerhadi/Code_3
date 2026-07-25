import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { getGoogleReviews } from './getGoogleReviews'
import { TestimonialCard } from './TestimonialCard'

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
    <section className={cn('bg-white py-8 md:py-10', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl mb-10">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((t, i) => (
            <TestimonialCard key={t.name + i} t={t} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
