// COMMENTED OUT ORIGINAL CODE WITH TYPESCRIPT ERROR
// import { neon } from '@neondatabase/serverless';
// import { PrismaClient } from '@prisma/client';

// const driver = neon(process.env.DATABASE_URL!); // serverless driver
// export const prismaEdge = new PrismaClient({ driverAdapter: driver });

// FIXED VERSION - USE STANDARD PRISMA CLIENT FOR EDGE
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prismaEdge: PrismaClient };

export const prismaEdge = globalForPrisma.prismaEdge || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaEdge = prismaEdge;



// import { neon } from '@neondatabase/serverless';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { PrismaClient } from '@prisma/client';

// const sql = neon(process.env.DATABASE_URL!); // returns the driver
// const adapter = new PrismaNeon(sql);

// export const prismaEdge = new PrismaClient({ adapter });