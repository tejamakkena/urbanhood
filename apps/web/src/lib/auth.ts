import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@urbanhood/db'
import type { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? '',
        port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER ?? '',
          pass: process.env.EMAIL_SERVER_PASSWORD ?? '',
        },
      },
      from: process.env.EMAIL_FROM ?? '',
    }),
  ],
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login/verify',
    error: '/login',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = (user as typeof user & { role: string }).role
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // New users default to RENTER role — set via Prisma default in schema
      void user
    },
  },
}
