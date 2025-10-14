import { prisma } from "@/lib/prisma";

/**
 * Logs a user activity into the database.
 * 
 * @param userId      ID of the authenticated user performing the action
 * @param action      Short string representing the action type (e.g., "login", "update_post")
 * @param description Detailed human-readable description of the action
 * @param metadata    Optional record with additional JSON metadata about the event
 */
export async function logUserActivity(
  userId: string,
  action: string,
  description: string,
  metadata?: Record<string, any>
) {
  try {
    await prisma.userActivityLog.create({
      data: {
        userId,
        action,
        description,
        metadata,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to log user activity:", error);
  }
}
