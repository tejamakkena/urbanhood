import Link from 'next/link'

const categories = [
  { label: 'Chairs', emoji: '🪑', slug: 'CHAIRS', description: 'Folding, chiavari, ghost chairs' },
  { label: 'Tables', emoji: '🪞', slug: 'TABLES', description: 'Round, rectangular, cocktail' },
  { label: 'Tents', emoji: '⛺', slug: 'TENTS', description: 'Frame, pole, canopy tents' },
  { label: 'Linens', emoji: '🛏️', slug: 'LINENS', description: 'Tablecloths, napkins, runners' },
  { label: 'Décor', emoji: '🌸', slug: 'DECOR', description: 'Centerpieces, backdrops, arches' },
  { label: 'Lighting', emoji: '💡', slug: 'LIGHTING', description: 'String lights, uplighting, LEDs' },
  { label: 'Tableware', emoji: '🍽️', slug: 'TABLEWARE', description: 'Plates, glasses, cutlery' },
  { label: 'Inflatables', emoji: '🎈', slug: 'INFLATABLES', description: 'Bounce houses, slides, arches' },
]

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Browse by category</h2>
          <p className="mt-3 text-neutral-500">
            Find exactly what you need for your next event
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/listings?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center transition-all duration-200 hover:border-primary-200 hover:bg-primary-50 hover:shadow-md"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-primary-700">
                  {cat.label}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
