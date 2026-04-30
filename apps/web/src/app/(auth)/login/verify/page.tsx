import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Check your email' }

export default function VerifyPage() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
        <Mail className="h-8 w-8 text-primary-600" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-neutral-900">Check your email</h1>
      <p className="mb-8 text-sm text-neutral-500">
        We&apos;ve sent a sign-in link to your email address. Click the link to complete sign-in.
      </p>
      <p className="text-sm text-neutral-500">
        Didn&apos;t receive it?{' '}
        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Try again
        </Link>
      </p>
    </div>
  )
}
