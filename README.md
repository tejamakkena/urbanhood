# Urbanhood

Party & Gathering Rental Marketplace — connect renters with local suppliers for chairs, tables, tents, décor, and more.

## Monorepo structure

```
urbanhood/
├── apps/
│   ├── web/          # Next.js 14 web app (App Router + Tailwind CSS)
│   └── mobile/       # Expo 51 React Native app (Expo Router)
├── packages/
│   ├── db/           # Prisma schema + database client
│   └── ui/           # Shared component library (Button, Card, Input, Badge, Avatar)
├── turbo.json
└── pnpm-workspace.yaml
```

## Tech stack

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Web | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Mobile | Expo 51, React Native, Expo Router |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js v4 (Google + Email magic link) |
| Design system | Tailwind CSS + custom tokens (violet/coral palette) |
| Payments (Phase 2) | Stripe |

## User roles

- **Renter** — browse listings, book rentals, leave reviews
- **Supplier** — list inventory, manage bookings, track earnings
- **Admin** — approve listings, resolve disputes, manage platform

## Quick start

### Prerequisites
- Node.js >= 20, pnpm >= 9
- PostgreSQL database

### Setup

```bash
# Install dependencies
pnpm install

# Copy env and fill in values
cp .env.example .env

# Generate Prisma client and run migrations
pnpm db:generate
pnpm db:migrate

# Seed demo data
pnpm --filter @urbanhood/db db:seed

# Start everything
pnpm dev
```

Web runs at `http://localhost:3000`, Expo at `http://localhost:8081`.

## Phase roadmap

| Phase | Focus | Status |
|---|---|---|
| **1 - Foundation** | Monorepo scaffold, DB schema, auth, design system | Done |
| **2 - MVP** | Listings CRUD, booking flow, Stripe payments | Upcoming |
| **3 - Growth** | Reviews, search/filters, supplier analytics | Upcoming |
| **4 - Scale** | Push notifications, admin dashboard, disputes | Upcoming |
