import React from 'react'
import Link from 'next/link'
import type { AboutTeaserBlock as AboutTeaserBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import { Eyebrow } from '@/components/site/Eyebrow'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'

type Props = {
  className?: string
} & AboutTeaserBlockProps

export const AboutTeaserBlock: React.FC<Props> = ({
  className,
  badge,
  title,
  description,
  linkLabel,
  linkUrl,
}) => {
  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          {badge && <Eyebrow>{badge}</Eyebrow>}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-gray-600">{description}</p>
          )}
          {linkUrl && (
            <Link href={linkUrl} className="mt-6 inline-block">
              <Button variant="exploreLink" size="link" asChild>
                <span>
                  {linkLabel || 'More About Us'}
                  <svg width="6" height="6" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.833252 9.16732L9.16659 0.833984M9.16659 0.833984H0.833252M9.16659 0.833984V9.16732"
                      stroke="url(#paint0_linear_about_teaser)"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_about_teaser"
                        x1="3.3963"
                        y1="11.8317"
                        x2="-1.83432"
                        y2="3.96613"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#C90E1D" />
                        <stop offset="1" stopColor="#F0B4AC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </Button>
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
