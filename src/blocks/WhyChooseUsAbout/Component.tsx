import type { WhyChooseUsAboutBlock as WhyChooseUsAboutBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
} & WhyChooseUsAboutBlockProps

export const WhyChooseUsAboutBlock: React.FC<Props> = ({
  className,
  title = 'why businesses like yours switch to us and stay.',
  subtitle = 'From managing your IT to securing your data, from connecting your spaces to equipping your meeting rooms',
  features = [],
}) => {
  return (
    <section className={cn('py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto', className)}>
      <div className="bg-[#FAFAFA] border border-[#E0DDDD] rounded-[32px] max-w-7xl mx-auto py-12 md:py-16 lg:py-20 px-5 w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Red Badge */}
          <div className="inline-block bg-[#C90E1D] border border-[#FF3B4B] text-white text-xs font-semibold px-5 py-2 rounded-full mb-6 uppercase tracking-wider">
            WHY CHOOSE US
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-xl lg:max-w-2xl mx-auto text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg max-w-lg lg:max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto relative">
          {features?.map((feature: any, index: number) => (
            <React.Fragment key={feature.id || index}>
              {/* Feature Card */}
              <div className="rounded-2xl p-6 sm:p-8 text-center">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div
                    dangerouslySetInnerHTML={{ __html: feature.icon || '' }}
                    className="w-[52px] h-[52px] flex items-center justify-center"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>

              {/* Divider Lines - Only show between cards */}
              {index < (features?.length || 0) - 1 && (
                <>
                  {/* Horizontal line for mobile, vertical for desktop */}
                  {index === 0 && (
                    <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-[50%] h-[1px] w-4/5 mx-auto bg-gradient-to-r from-transparent via-[#C90E1D] to-transparent"></div>
                  )}
                  {index === 1 && (
                    <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 h-[1px] w-4/5 sm:w-[40%] sm:rotate-90 mx-auto bg-gradient-to-r from-transparent via-[#C90E1D] to-transparent"></div>
                  )}
                  {index === 2 && (
                    <div className="sm:hidden h-[1px] w-4/5 mx-auto bg-gradient-to-r from-transparent via-[#C90E1D] to-transparent"></div>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}