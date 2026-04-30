import Link from 'next/link'

const links = {
  Product: [
    { label: 'Browse Rentals', href: '/listings' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Suppliers: [
    { label: 'List Your Items', href: '/become-supplier' },
    { label: 'Supplier Dashboard', href: '/dashboard/supplier' },
    { label: 'Supplier FAQ', href: '/faq/supplier' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold text-neutral-900">{category}</h3>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-500 hover:text-neutral-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <span className="text-sm font-semibold text-neutral-900">Urbanhood</span>
          </div>
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Urbanhood. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
