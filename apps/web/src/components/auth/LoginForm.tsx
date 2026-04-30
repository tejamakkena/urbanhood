'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button, Input } from '@urbanhood/ui'
import { Mail } from 'lucide-react'

const errorMessages: Record<string, string> = {
  OAuthSignin: 'Could not start sign-in. Try again.',
  OAuthCallback: 'Sign-in failed. Try again.',
  OAuthCreateAccount: 'Could not create account.',
  EmailCreateAccount: 'Could not create account.',
  Callback: 'Sign-in callback error.',
  OAuthAccountNotLinked:
    'This email is already registered with a different sign-in method.',
  EmailSignin: 'Could not send email. Try again.',
  CredentialsSignin: 'Invalid credentials.',
  default: 'Something went wrong. Try again.',
}

interface LoginFormProps {
  callbackUrl?: string
  error?: string
}

export function LoginForm({ callbackUrl, error }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState<'google' | 'email' | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  const redirectTo = callbackUrl ?? '/dashboard'

  async function handleGoogleSignIn() {
    setLoading('google')
    await signIn('google', { callbackUrl: redirectTo })
  }

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading('email')
    const result = await signIn('email', { email, callbackUrl: redirectTo, redirect: false })
    setLoading(null)
    if (result?.ok) setEmailSent(true)
  }

  if (emailSent) {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50 p-6 text-center">
        <Mail className="mx-auto mb-3 h-8 w-8 text-primary-600" />
        <p className="font-medium text-neutral-900">Check your email</p>
        <p className="mt-1 text-sm text-neutral-500">
          We sent a sign-in link to <strong>{email}</strong>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessages[error] ?? errorMessages.default}
        </div>
      )}

      {/* Google */}
      <Button
        variant="secondary"
        size="lg"
        loading={loading === 'google'}
        onClick={handleGoogleSignIn}
        className="w-full"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-neutral-200" />
        <span className="text-xs font-medium text-neutral-400">or</span>
        <hr className="flex-1 border-neutral-200" />
      </div>

      {/* Email */}
      <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
        />
        <Button
          type="submit"
          size="lg"
          loading={loading === 'email'}
          disabled={!email}
          className="w-full"
        >
          Continue with email
        </Button>
      </form>

      <p className="text-center text-xs text-neutral-400">
        By continuing, you agree to our{' '}
        <a href="/terms" className="underline hover:text-neutral-600">Terms</a> and{' '}
        <a href="/privacy" className="underline hover:text-neutral-600">Privacy Policy</a>.
      </p>
    </div>
  )
}
