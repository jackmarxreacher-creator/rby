import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: process.env.GOOGLE_CLIENT_ID
      ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }
      : undefined,
    github: process.env.GITHUB_CLIENT_ID
      ? { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET! }
      : undefined,
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: 'string',
        required: false,
        input: true, // allow during sign-up
      },
      role: {
        type: 'string', // Prisma enum will enforce values
        defaultValue: 'VIEWER',
        input: false,  // only admins can change role
      },
    },
  },
})