const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
      // OpenAI - ChatGPT
      { userAgent: 'GPTBot', allow: '/', disallow: '/admin/*' },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: '/admin/*' },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: '/admin/*' },
      // Anthropic - Claude
      { userAgent: 'ClaudeBot', allow: '/', disallow: '/admin/*' },
      { userAgent: 'Claude-Web', allow: '/', disallow: '/admin/*' },
      { userAgent: 'anthropic-ai', allow: '/', disallow: '/admin/*' },
      // Google - Gemini / AI features (separate from standard Googlebot search indexing)
      { userAgent: 'Google-Extended', allow: '/', disallow: '/admin/*' },
      { userAgent: 'Googlebot', allow: '/', disallow: '/admin/*' },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
