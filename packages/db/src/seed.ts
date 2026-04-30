import { PrismaClient, UserRole, ListingCategory, ListingStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@urbanhood.com' },
    update: {},
    create: {
      email: 'admin@urbanhood.com',
      name: 'Urbanhood Admin',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  })

  const supplier = await prisma.user.upsert({
    where: { email: 'supplier@demo.com' },
    update: {},
    create: {
      email: 'supplier@demo.com',
      name: 'Party Pro Rentals',
      role: UserRole.SUPPLIER,
      emailVerified: new Date(),
    },
  })

  const renter = await prisma.user.upsert({
    where: { email: 'renter@demo.com' },
    update: {},
    create: {
      email: 'renter@demo.com',
      name: 'Jane Smith',
      role: UserRole.RENTER,
      emailVerified: new Date(),
    },
  })

  await prisma.listing.createMany({
    skipDuplicates: true,
    data: [
      {
        supplierId: supplier.id,
        title: 'Folding Chairs (Set of 50)',
        description:
          'White resin folding chairs, perfect for weddings, birthdays, and outdoor events. Clean, durable, and easy to set up.',
        category: ListingCategory.CHAIRS,
        pricePerDay: 75.0,
        quantity: 50,
        images: [],
        location: '123 Warehouse Dr',
        city: 'Austin',
        state: 'TX',
        status: ListingStatus.ACTIVE,
      },
      {
        supplierId: supplier.id,
        title: 'Round Banquet Tables (Set of 10)',
        description:
          '60-inch round banquet tables that seat up to 8 guests each. Great for receptions and dinner parties.',
        category: ListingCategory.TABLES,
        pricePerDay: 120.0,
        quantity: 10,
        images: [],
        location: '123 Warehouse Dr',
        city: 'Austin',
        state: 'TX',
        status: ListingStatus.ACTIVE,
      },
      {
        supplierId: supplier.id,
        title: '20x30 Frame Tent',
        description:
          'Heavy-duty aluminum frame tent. Ideal for backyard parties and outdoor gatherings up to 60 guests.',
        category: ListingCategory.TENTS,
        pricePerDay: 350.0,
        quantity: 1,
        images: [],
        location: '123 Warehouse Dr',
        city: 'Austin',
        state: 'TX',
        status: ListingStatus.ACTIVE,
      },
    ],
  })

  console.log(`Seeded: admin(${admin.id}), supplier(${supplier.id}), renter(${renter.id})`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
