const steps = [
  {
    step: '01',
    title: 'Search & discover',
    description:
      'Browse hundreds of party supplies from local suppliers in your area. Filter by category, date, and location.',
  },
  {
    step: '02',
    title: 'Book instantly',
    description:
      'Select your dates, choose quantity, and pay securely online. Get instant confirmation and supplier contact info.',
  },
  {
    step: '03',
    title: 'Enjoy your event',
    description:
      'Receive your rentals, set up your perfect event, and return everything when you\'re done. Stress-free.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">How it works</h2>
          <p className="mt-3 text-neutral-500">Book in minutes, not hours</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative flex flex-col items-start">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-8 top-8 hidden h-px w-full bg-primary-200 sm:block" />
              )}

              <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 shadow-md">
                <span className="text-xl font-bold text-white">{step.step}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
