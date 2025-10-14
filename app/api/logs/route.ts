import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "8", 10);

  const userIdFilter = searchParams.get("userId") || undefined;
  const actionFilter = searchParams.get("action") || undefined;

  const where: any = {};
  if (userIdFilter) {
    where.userId = userIdFilter;
  }
  if (actionFilter) {
    where.action = actionFilter;
  }

  // Total count for pagination
  const totalCount = await prisma.userActivityLog.count({ where });

  // Fetch logs with pagination, filtering, and include users
  const logs = await prisma.userActivityLog.findMany({
    where,
    orderBy: [{ timestamp: "desc" }, { id: "asc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true,
        },
      },
    },
  });

  // Fetch all distinct users for filter dropdown
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      department: true,
    },
  });

  // Fetch all distinct actions in logs for filter dropdown
  const allActions = await prisma.userActivityLog
    .groupBy({
      by: ["action"],
    })
    .then(groups => groups.map(g => g.action));

  // Convert timestamps to ISO strings for JSON serialization
  const logsWithStringDates = logs.map(log => ({
    ...log,
    timestamp: log.timestamp.toISOString(),
  }));

  return NextResponse.json({
    logs: logsWithStringDates,
    totalCount,
    allUsers,
    allActions,
  });
}
