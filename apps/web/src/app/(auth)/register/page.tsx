import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create your Urbanhood account',
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Create your account</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Join Urbanhood to rent party supplies or list your inventory
        </p>
      </div>

      {/* Reuse the same form — NextAuth handles new users automatically */}
      <LoginForm
        callbackUrl={searchParams.callbackUrl ?? '/dashboard'}
        error={searchParams.error}
      />

      <p className="mt-6 text-center text-sm text-neutral-500">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </div>
  )
}
