import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const weeklyData = await prisma.waterEntry.findMany({
      where: {
        userId: userId,
        date: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(weeklyData);
  } catch (error) {
    console.error("Error fetching weekly water consumption:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
