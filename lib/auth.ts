// lib/auth.ts
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { prisma } from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),

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
        input: true,
      },
      role: {
        type: 'string',
        // no default role — require explicit selection in admin UI
        input: false,
      },
    },
  },

  plugins: [nextCookies()],
})

/* Server-side helper: use in RSC or Server Actions */
export async function getAuth() {
  const { headers } = await import('next/headers')
  const h = await headers() // ← await the promise first
  return auth.api.getSession({ headers: new Headers(h as any) })
}




// // lib/auth.ts
// import { betterAuth } from 'better-auth'
// import { prismaAdapter } from 'better-auth/adapters/prisma'
// import { nextCookies } from 'better-auth/next-js'
// import { prisma } from './prisma'

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, { provider: 'postgresql' }),

//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: false,
//   },

//   socialProviders: {
//     google: process.env.GOOGLE_CLIENT_ID
//       ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }
//       : undefined,
//     github: process.env.GITHUB_CLIENT_ID
//       ? { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET! }
//       : undefined,
//   },

//   // NOTE: older version used `defaultValue: 'VIEWER'` here. Default role assignment
//   // has been removed so that new sign-ups do not receive a role automatically.
//   user: {
//     additionalFields: {
//       phoneNumber: {
//         type: 'string',
//         required: false,
//         input: true,
//       },
//       role: {
//         type: 'string',
//         // no default assigned; admins should set roles in the CMS
//         input: false,
//       },
//     },
//   },

//   plugins: [nextCookies()],
// })

// /* Server-side helper: use in RSC or Server Actions */
// export async function getAuth() {
//   const { headers } = await import('next/headers')
//   return auth.api.getSession({
//     headers: new Headers(headers() as any), // unwrap Promise<ReadonlyHeaders> → Headers
//   })
// }





// import { betterAuth } from 'better-auth'
// import { prismaAdapter } from 'better-auth/adapters/prisma'
// import { prisma } from './prisma'

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: 'postgresql',
//   }),
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: false,
//   },
//   socialProviders: {
//     google: process.env.GOOGLE_CLIENT_ID
//       ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }
//       : undefined,
//     github: process.env.GITHUB_CLIENT_ID
//       ? { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET! }
//       : undefined,
//   },
//   user: {
//     additionalFields: {
//       phoneNumber: {
//         type: 'string',
//         required: false,
//         input: true, // allow during sign-up
//       },
//       role: {
//         type: 'string', // Prisma enum will enforce values
//         defaultValue: 'VIEWER',
//         input: false,  // only admins can change role
//       },
//     },
//   },
// })