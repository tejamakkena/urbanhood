import Link from 'next/link'
import { Button } from '@urbanhood/ui'
import { Search } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-accent-500/20" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
          🎉 Party & Event Rentals Near You
        </div>

        <h1 className="text-balance mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          Everything you need
          <br />
          <span className="text-accent-300">for the perfect event</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/75">
          Rent chairs, tables, tents, décor, and more from trusted local suppliers. Book instantly,
          enjoy your event, return hassle-free.
        </p>

        {/* Search bar */}
        <form
          action="/listings"
          method="GET"
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              name="q"
              placeholder="What do you need? (e.g. chairs, tent...)"
              className="h-12 w-full rounded-xl border-0 bg-white pl-11 pr-4 text-sm text-neutral-900 placeholder-neutral-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <Button size="lg" variant="accent" type="submit" className="shrink-0 shadow-lg">
            Search
          </Button>
        </form>

        <p className="mt-6 text-sm text-white/50">
          Popular:&nbsp;
          {['Folding Chairs', 'Banquet Tables', 'Party Tents', 'Linens', 'String Lights'].map(
            (item, i, arr) => (
              <span key={item}>
                <Link href={`/listings?q=${encodeURIComponent(item)}`} className="underline hover:text-white/80">
                  {item}
                </Link>
                {i < arr.length - 1 && ', '}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
