// app/api/set-admin/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
  });

  return NextResponse.json({ ok: true });
}