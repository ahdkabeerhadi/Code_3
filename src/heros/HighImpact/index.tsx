'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, HeroText, subText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  return (
    <section className="max-w-7xl w-full px-4 sm:px-6 mx-auto flex flex-col flex-1 mt-10 md:mt-14 lg:mt-20 items-center relative">
      <div className="font-sans w-full ">
        <div className="max-w-5xl text-center md:text-start">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">{HeroText}</h1>
          {subText && <p className="my-6 text-md  md:text-xl leading-relaxed text-balance text-gray-700">{subText}</p>}
        </div>
        <div>
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex w-full flex-col-reverse md:flex-row gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} size="full" className="md:w-auto" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col min-h-[20vh] mt-10 mb-4 lg: my-0 md:min-h-[30vh] xl:min-h-[60vh] object-fill relative items-center justify-center text-foreground animate-gentle-pulse">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-fill" priority resource={media} />
        )}
        {/* <div className='z-10 max-w-4xl text-center'>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{HeroText}</h1>
          {subText && <p className="mb-6 text-lg">{subText}</p>}
          <Media fill imgClassName="object-cover relative" priority resource={media} />
        )} */}
      </div>
    </section>
    // <div className="relative -mt-[10.4rem] flex items-center justify-center text-foreground">
    //   <div className="container mb-8 z-10 relative flex items-center justify-center">
    //     <div className="max-w-[36.5rem] md:text-center">
    //       <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{HeroText}</h1>
    //       {subText && <p className="mb-6 text-lg">{subText}</p>}
    //       {/* {richText && <RichText className="mb-6" data={richText} enableGutter={false} />} */}
    //       {Array.isArray(links) && links.length > 0 && (
    //         <ul className="flex md:justify-center gap-4">
    //           {links.map(({ link }, i) => {
    //             return (
    //               <li key={i}>
    //                 <CMSLink {...link} />
    //               </li>
    //             )
    //           })}
    //         </ul>
    //       )}
    //     </div>
    //   </div>
    //   <div className="min-h-[80vh] select-none">
    //     {media && typeof media === 'object' && (
    //       <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
    //     )}
    //   </div>
    // </div>
  )
}
