import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { Badge } from '@urbanhood/ui'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session?.user) redirect('/login?callbackUrl=/dashboard')
  const user = session.user

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, {user.name?.split(' ')[0] ?? 'there'} 👋
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm text-neutral-500">{user.email}</p>
          <Badge variant={user.role === 'SUPPLIER' ? 'default' : user.role === 'ADMIN' ? 'accent' : 'neutral'}>
            {user.role}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.role === 'RENTER' && (
          <>
            <DashboardCard
              title="Browse rentals"
              description="Find chairs, tables, tents, and more for your next event."
              href="/listings"
              emoji="🔍"
            />
            <DashboardCard
              title="My bookings"
              description="View and manage your upcoming and past bookings."
              href="/dashboard/bookings"
              emoji="📅"
            />
            <DashboardCard
              title="Become a supplier"
              description="Have items to rent? Start earning from your inventory."
              href="/become-supplier"
              emoji="💼"
            />
          </>
        )}

        {user.role === 'SUPPLIER' && (
          <>
            <DashboardCard
              title="My listings"
              description="Manage your inventory and listing details."
              href="/dashboard/listings"
              emoji="📦"
            />
            <DashboardCard
              title="Bookings"
              description="View incoming and active rental requests."
              href="/dashboard/bookings"
              emoji="📅"
            />
            <DashboardCard
              title="Add new listing"
              description="List a new item for renters to discover."
              href="/dashboard/listings/new"
              emoji="➕"
            />
          </>
        )}

        {user.role === 'ADMIN' && (
          <>
            <DashboardCard
              title="Pending listings"
              description="Review and approve supplier submissions."
              href="/admin/listings"
              emoji="🔍"
            />
            <DashboardCard
              title="All users"
              description="Manage platform users and roles."
              href="/admin/users"
              emoji="👥"
            />
            <DashboardCard
              title="Disputes"
              description="Resolve open booking disputes."
              href="/admin/disputes"
              emoji="⚖️"
            />
          </>
        )}
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  href,
  emoji,
}: {
  title: string
  description: string
  href: string
  emoji: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:border-primary-200 hover:shadow-md"
    >
      <span className="text-3xl">{emoji}</span>
      <div>
        <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
    </Link>
  )
}
