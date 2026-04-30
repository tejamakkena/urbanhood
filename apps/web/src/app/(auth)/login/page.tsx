import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Urbanhood account',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in to your Urbanhood account</p>
      </div>

      <LoginForm
        callbackUrl={searchParams.callbackUrl}
        error={searchParams.error}
      />

      <p className="mt-6 text-center text-sm text-neutral-500">
        Don&apos;t have an account?{' '}
        <a href="/register" className="font-medium text-primary-600 hover:text-primary-700">
          Sign up
        </a>
      </p>
    </div>
  )
}
