import Link from 'next/link'
import { Button } from '@urbanhood/ui'
import { TrendingUp, Clock, Shield } from 'lucide-react'

const perks = [
  {
    icon: TrendingUp,
    title: 'Earn more revenue',
    description: 'Your idle inventory earns money every weekend.',
  },
  {
    icon: Clock,
    title: 'Easy scheduling',
    description: 'Set your availability and let renters book automatically.',
  },
  {
    icon: Shield,
    title: 'Protected & insured',
    description: 'Every booking is covered by our platform protection.',
  },
]

export function SupplierCtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 sm:p-12">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Own party supplies?
                <br />
                <span className="text-accent-300">Start earning today.</span>
              </h2>
              <p className="mb-8 text-white/70">
                List your chairs, tables, tents, and more. Reach hundreds of event planners and
                families in your neighborhood.
              </p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                {perks.map((perk) => (
                  <div key={perk.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <perk.icon className="h-4 w-4 text-accent-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{perk.title}</p>
                      <p className="text-xs text-white/60">{perk.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/become-supplier">
                <Button variant="accent" size="lg">
                  List your inventory — it&apos;s free
                </Button>
              </Link>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/10">
                <span className="text-8xl">🎪</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
