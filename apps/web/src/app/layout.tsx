import type { Metadata } from 'next'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { getSession } from '@/lib/session'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Urbanhood — Party & Event Rental Marketplace',
    template: '%s | Urbanhood',
  },
  description:
    'Rent party supplies, tables, chairs, tents, décor, and more for any occasion. Connect with trusted local suppliers.',
  keywords: ['party rental', 'event rental', 'chairs rental', 'tent rental', 'table rental'],
  openGraph: {
    title: 'Urbanhood — Party & Event Rental Marketplace',
    description: 'Rent everything you need for your next event.',
    type: 'website',
    locale: 'en_US',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
