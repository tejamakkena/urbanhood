import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@urbanhood/db'
import { Badge, Avatar, Button } from '@urbanhood/ui'
import Link from 'next/link'
import { MapPin, Calendar, Package } from 'lucide-react'

interface ListingPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    select: { title: true, description: true },
  })
  if (!listing) return { title: 'Not found' }
  return { title: listing.title, description: listing.description.slice(0, 160) }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id, status: 'ACTIVE' },
    include: {
      supplier: { select: { id: true, name: true, image: true, createdAt: true } },
      reviews: {
        include: { reviewer: { select: { name: true, image: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: { select: { reviews: true } },
    },
  })

  if (!listing) notFound()

  const avgRating =
    listing.reviews.length > 0
      ? listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length
      : null

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <Link href="/listings" className="text-sm text-primary-600 hover:text-primary-700">
          ← Back to listings
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="mb-6 flex h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200">
            <span className="text-8xl">
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

          {/* Title & meta */}
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{listing.title}</h1>
              <Badge variant="default">{listing.category}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.city}, {listing.state}
              </span>
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                Qty available: {listing.quantity}
              </span>
              {avgRating && (
                <span>⭐ {avgRating.toFixed(1)} ({listing._count.reviews} reviews)</span>
              )}
            </div>
          </div>

          <p className="mb-8 leading-relaxed text-neutral-600">{listing.description}</p>

          {/* Supplier */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-neutral-900">Supplied by</h2>
            <div className="flex items-center gap-3">
              <Avatar
                src={listing.supplier.image}
                fallback={listing.supplier.name ?? 'Supplier'}
                size="md"
              />
              <div>
                <p className="font-medium text-neutral-900">{listing.supplier.name ?? 'Supplier'}</p>
                <p className="text-xs text-neutral-500">
                  Member since {new Date(listing.supplier.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          {listing.reviews.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900">Reviews</h2>
              <div className="flex flex-col gap-4">
                {listing.reviews.map((review) => (
                  <div key={review.id} className="rounded-xl border border-neutral-200 bg-white p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Avatar
                        src={review.reviewer.image}
                        fallback={review.reviewer.name ?? 'Renter'}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {review.reviewer.name ?? 'Anonymous'}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {'⭐'.repeat(review.rating)}
                        </p>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-neutral-600">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <p className="text-3xl font-bold text-neutral-900">
                ${Number(listing.pricePerDay).toFixed(0)}
                <span className="text-base font-normal text-neutral-400">/day</span>
              </p>
            </div>

            <div className="mb-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-neutral-200 p-3 text-sm text-neutral-600">
                <Calendar className="h-4 w-4 text-neutral-400" />
                <span>Select dates at checkout</span>
              </div>
            </div>

            <Link href={`/checkout?listing=${listing.id}`}>
              <Button size="lg" className="w-full">Reserve now</Button>
            </Link>

            <p className="mt-3 text-center text-xs text-neutral-400">
              You won&apos;t be charged until confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
