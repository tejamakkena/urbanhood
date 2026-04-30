'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Avatar, Button } from '@urbanhood/ui'
import type { UserRole } from '@urbanhood/db'

interface DashboardNavProps {
  user: {
    name?: string | null
    email: string
    image?: string | null
    role: UserRole
  }
}

export function DashboardNav({ user }: DashboardNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <span className="hidden text-base font-bold text-neutral-900 sm:block">Urbanhood</span>
          </Link>

          <nav className="hidden items-center gap-4 sm:flex">
            <Link href="/dashboard" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
              Dashboard
            </Link>
            {user.role === 'SUPPLIER' && (
              <>
                <Link href="/dashboard/listings" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                  My Listings
                </Link>
                <Link href="/dashboard/bookings" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                  Bookings
                </Link>
              </>
            )}
            {user.role === 'RENTER' && (
              <Link href="/dashboard/bookings" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                My Bookings
              </Link>
            )}
            {user.role === 'ADMIN' && (
              <Link href="/admin" className="text-sm font-medium text-neutral-600 hover:text-neutral-900">
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Avatar
            src={user.image}
            fallback={user.name ?? user.email}
            size="sm"
          />
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium text-neutral-900 leading-none">
              {user.name ?? user.email}
            </span>
            <span className="mt-0.5 text-xs text-neutral-500">{user.role}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="ml-2"
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
