import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const firstDayOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { waterGoal: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const thisMonthEntries = await prisma.waterEntry.findMany({
      where: {
        userId: userId,
        date: { gte: firstDayOfMonth, lte: now },
      },
    });

    const lastMonthEntries = await prisma.waterEntry.findMany({
      where: {
        userId: userId,
        date: { gte: firstDayOfLastMonth, lte: lastDayOfLastMonth },
      },
    });

    const thisMonthTotal = thisMonthEntries.reduce(
      (sum, entry) => sum + entry.glasses,
      0
    );
    const lastMonthTotal = lastMonthEntries.reduce(
      (sum, entry) => sum + entry.glasses,
      0
    );

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    const goalForMonth = user.waterGoal * daysInMonth;
    const percentageOfGoal = Math.round((thisMonthTotal / goalForMonth) * 100);

    const percentageChange =
      lastMonthTotal > 0
        ? Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100)
        : 0;

    return NextResponse.json({
      thisMonthTotal: thisMonthTotal * 250,
      percentageOfGoal,
      percentageChange,
    });
  } catch (error) {
    console.error("Error fetching water stats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
