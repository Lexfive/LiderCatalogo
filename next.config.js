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

  // Resolve erro "@opentelemetry/api" no bundler de Edge Functions do Netlify.
  // Essa dependência é puxada indiretamente pelo @supabase/ssr no middleware.
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        '@opentelemetry/api',
      ]
    }
    return config
  },
}

module.exports = nextConfig
