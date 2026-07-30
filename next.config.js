import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel's Deployment Protection blocks Next's own server-side image-optimization
    // fetch on protected preview deployments (it's an unauthenticated internal request,
    // same as any other route). Disabling optimization there makes the browser fetch
    // images directly instead, which correctly carries the viewer's Vercel auth session.
    // Production isn't protection-walled, so it keeps full optimization.
    unoptimized: process.env.VERCEL_ENV === 'preview',
    // Next's image optimizer blocks SVG by default (it can contain scripts) - some
    // uploaded partner/brand logos are SVGs, so allow them. The CSP still prevents
    // any embedded script in an SVG from executing.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      {
        // Every preview deployment gets its own unique *.vercel.app hostname (not knowable
        // at build time), and getClientSideURL() now points media URLs at that hostname
        // instead of production's when running on a preview — this allowlists all of them.
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
