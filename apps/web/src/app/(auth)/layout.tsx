import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-primary-700 to-primary-900 p-12 lg:flex lg:w-1/2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <span className="text-sm font-bold text-white">U</span>
          </div>
          <span className="text-lg font-bold text-white">Urbanhood</span>
        </Link>

        <div>
          <blockquote className="text-xl font-medium leading-relaxed text-white/90">
            &ldquo;Urbanhood made it so easy to find chairs and tables for my daughter&apos;s
            quinceañera. Everything was delivered on time and the quality was amazing.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-white">Maria G.</p>
            <p className="text-sm text-white/60">Austin, TX</p>
          </div>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-sm text-white/60">Listings</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-sm text-white/60">Cities</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">4.9★</p>
            <p className="text-sm text-white/60">Avg. rating</p>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <span className="text-lg font-bold text-neutral-900">Urbanhood</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  )
}
