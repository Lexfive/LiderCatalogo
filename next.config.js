/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'staticmap.openstreetmap.de' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,

  // Resolve erro "@opentelemetry/api" puxado indiretamente pelo @supabase/ssr.
  // serverExternalPackages exclui o pacote do bundle server/middleware no Next.js 14.
  serverExternalPackages: ['@opentelemetry/api'],
}

module.exports = nextConfig
