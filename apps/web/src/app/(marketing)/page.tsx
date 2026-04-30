import { HeroSection } from '@/components/home/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { SupplierCtaSection } from '@/components/home/SupplierCtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <SupplierCtaSection />
    </>
  )
}
