import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@urbanhood/ui', '@urbanhood/db'],
  experimental: {
    outputFileTracingIncludes: {
      '/**/*': [
        './node_modules/.pnpm/@prisma+client@*/**/*',
        './node_modules/.pnpm/.prisma*/**/*',
        './node_modules/.prisma/client/**/*',
        './node_modules/@prisma/client/**/*',
        './packages/db/node_modules/.prisma/**/*',
      ],
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
