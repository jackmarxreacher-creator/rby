import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prismaEdge } from './prisma-edge';

export const authEdge = betterAuth({
  database: prismaAdapter(prismaEdge, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true },
});



// import { betterAuth } from 'better-auth';
// import { prismaAdapter } from 'better-auth/adapters/prisma';
// import { prismaEdge } from './prisma-edge';

// export const authEdge = betterAuth({
//   database: prismaAdapter(prismaEdge, { provider: 'postgresql' }),
//   emailAndPassword: { enabled: true },
// });