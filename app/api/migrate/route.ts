import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Run raw SQL to rename the enum
    await prisma.$executeRaw`ALTER TYPE "Role" RENAME TO "StaffRole"`;
    
    return NextResponse.json({ success: true, message: "Migration completed" });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      // If enum already renamed, that's ok
      alreadyRenamed: error.message?.includes("does not exist")
    });
  }
}