import type { Metadata } from 'next'
import { ListingCategory } from '@urbanhood/db'
import { Badge } from '@urbanhood/ui'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Browse Rentals' }

const categoryLabels: Record<ListingCategory, string> = {
  CHAIRS: 'Chairs',
  TABLES: 'Tables',
  LINENS: 'Linens',
  DECOR: 'Décor',
  TENTS: 'Tents',
  LIGHTING: 'Lighting',
  AUDIO_VISUAL: 'Audio/Visual',
  TABLEWARE: 'Tableware',
  INFLATABLES: 'Inflatables',
  OTHER: 'Other',
}

interface ListingsPageProps {
  searchParams: { q?: string; category?: string; city?: string }
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const { prisma } = await import('@urbanhood/db')

  const listings = await prisma.listing.findMany({
    where: {
      status: 'ACTIVE',
      ...(searchParams.category && { category: searchParams.category as ListingCategory }),
      ...(searchParams.city && { city: { contains: searchParams.city, mode: 'insensitive' } }),
      ...(searchParams.q && {
        OR: [
          { title: { contains: searchParams.q, mode: 'insensitive' } },
          { description: { contains: searchParams.q, mode: 'insensitive' } },
        ],
      }),
    },
    include: { supplier: { select: { name: true, image: true } } },
    orderBy: { createdAt: 'desc' },
    take: 48,
  })

  return (
    <div>
      {/* Filters header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {searchParams.q ? `Results for "${searchParams.q}"` : 'All Rentals'}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">{listings.length} items available</p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <Link href="/listings">
            <Badge variant={!searchParams.category ? 'default' : 'neutral'} className="cursor-pointer">
              All
            </Badge>
          </Link>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <Link key={value} href={`/listings?category=${value}`}>
              <Badge
                variant={searchParams.category === value ? 'default' : 'neutral'}
                className="cursor-pointer"
              >
                {label}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {listings.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-neutral-600">No listings found</p>
          <p className="mt-1 text-sm text-neutral-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:shadow-md"
            >
              {/* Image placeholder */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                <span className="text-5xl">
                  {listing.category === 'CHAIRS' ? '🪑' :
                   listing.category === 'TABLES' ? '🪞' :
                   listing.category === 'TENTS' ? '⛺' :
                   listing.category === 'LINENS' ? '🛏️' :
                   listing.category === 'DECOR' ? '🌸' :
                   listing.category === 'LIGHTING' ? '💡' :
                   listing.category === 'TABLEWARE' ? '🍽️' :
                   listing.category === 'INFLATABLES' ? '🎈' : '📦'}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-tight text-neutral-900 group-hover:text-primary-700">
                    {listing.title}
                  </h3>
                  <Badge variant="neutral" className="shrink-0 text-xs">
                    {categoryLabels[listing.category]}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-xs text-neutral-500">{listing.description}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <p className="text-base font-bold text-neutral-900">
                    ${Number(listing.pricePerDay).toFixed(0)}
                    <span className="text-xs font-normal text-neutral-400">/day</span>
                  </p>
                  <p className="text-xs text-neutral-400">{listing.city}, {listing.state}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
