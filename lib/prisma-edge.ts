import { neon } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';

const driver = neon(process.env.DATABASE_URL!); // serverless driver
export const prismaEdge = new PrismaClient({ driverAdapter: driver });



// import { neon } from '@neondatabase/serverless';
// import { PrismaNeon } from '@prisma/adapter-neon';
// import { PrismaClient } from '@prisma/client';

// const sql = neon(process.env.DATABASE_URL!); // returns the driver
// const adapter = new PrismaNeon(sql);

// export const prismaEdge = new PrismaClient({ adapter });