/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domínios externos permitidos para imagens (adicione conforme necessário)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Preparado para Sanity CMS
      },
    ],
    // Formatos modernos para melhor performance
    formats: ['image/avif', 'image/webp'],
  },
  // Otimizações de performance
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
