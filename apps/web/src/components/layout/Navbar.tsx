'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Avatar, Button } from '@urbanhood/ui'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <span className="text-sm font-bold text-white">U</span>
          </div>
          <span className="text-lg font-bold text-neutral-900">Urbanhood</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/listings" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            Browse Rentals
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            How It Works
          </Link>
          <Link href="/become-supplier" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
            List Your Items
          </Link>
        </nav>

        {/* Auth actions */}
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Avatar
                  src={session.user.image}
                  fallback={session.user.name ?? session.user.email}
                  size="sm"
                  className="cursor-pointer ring-2 ring-transparent hover:ring-primary-300"
                />
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/listings" className="text-sm font-medium text-neutral-700" onClick={() => setMobileOpen(false)}>Browse Rentals</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-neutral-700" onClick={() => setMobileOpen(false)}>How It Works</Link>
            <Link href="/become-supplier" className="text-sm font-medium text-neutral-700" onClick={() => setMobileOpen(false)}>List Your Items</Link>
            <hr className="border-neutral-200" />
            {session ? (
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login"><Button variant="secondary" className="w-full" onClick={() => setMobileOpen(false)}>Sign in</Button></Link>
                <Link href="/register"><Button className="w-full" onClick={() => setMobileOpen(false)}>Get started</Button></Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
