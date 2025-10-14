//----- Added Server side Logging pagination and count --//
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Fetch paginated user activity logs with optional filters and sorting.
 * Returns logs and total count for pagination.
 */
export async function fetchUserActivityLogs({
  page = 1,
  pageSize = 50,
  sortBy = "timestamp",
  sortOrder = "desc",
  userIdFilter,
  actionFilter,
}: {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  userIdFilter?: string
  actionFilter?: string
}) {
  const where: any = {}
  if (userIdFilter) {
    where.userId = userIdFilter
  }
  if (actionFilter) {
    where.action = actionFilter
  }

  const totalCount = await prisma.userActivityLog.count({ where })

  const logs = await prisma.userActivityLog.findMany({
    where,
    orderBy: [{ [sortBy]: sortOrder }, { id: "asc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  return { logs, totalCount }
}





// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// export const prisma = globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma