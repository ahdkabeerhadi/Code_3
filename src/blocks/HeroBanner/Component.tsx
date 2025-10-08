import type { HeroBannerBlock as HeroBannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
} & HeroBannerBlockProps

export const HeroBannerBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  showLogo = true,
}) => {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[1rem] pb-[3rem] md:pb-[4rem] xl:pb-[5rem]',
        className,
      )}
    >
      <div className="relative mx-auto min-w-full max-w-6xl rounded-[32px] text-center">
        {backgroundImage && (
          <div className="absolute inset-0 z-[-1] rounded-[32px] overflow-hidden">
            <img
              src={
                typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.url || ''
              }
              alt="Background"
              className="h-full w-full rounded-[32px] object-cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-5 px-6 py-12">
          {showLogo && (
            <div className="mx-auto mb-3 flex items-center gap-2 rounded-full bg-white p-1 pr-4">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.8" y="0.3" width="23.4" height="23.4" rx="11.7" fill="#181A1A" />
                <rect
                  x="0.8"
                  y="0.3"
                  width="23.4"
                  height="23.4"
                  rx="11.7"
                  stroke="url(#paint0_linear_158_28312)"
                  strokeWidth="0.6"
                />
                <path
                  d="M8.21394 15.8048L15.8744 9.37696M15.8744 9.37696L8.83022 8.76067M15.8744 9.37696L15.2581 16.4211"
                  stroke="#F8FAFC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_158_28312"
                    x1="7"
                    y1="2.04688"
                    x2="19.5"
                    y2="22.5469"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.409189" stopColor="#505050" />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              CODE3
            </div>
          )}

          {title && (
            <h1 className="mx-auto max-w-xl text-3xl font-bold lg:leading-snug text-gray-900 md:text-4xl lg:max-w-2xl lg:text-5xl">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mx-auto max-w-lg px-4 text-base leading-relaxed text-gray-800 sm:text-lg md:text-xl">
              {subtitle}
            </p>
          )}

          {buttonText && (
            <div className="flex justify-center">
              <button className="transform cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-medium text-white duration-300 active:scale-95 hover:bg-gradient-to-br hover:from-black hover:to-white/40 hover:via-black sm:px-8 sm:py-4 sm:text-base">
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
