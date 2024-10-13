import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

async function getWeeklyWaterConsumption(userId: string) {
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

  return weeklyData.map((entry) => ({
    date: entry.date,
    glasses: entry.glasses || 0,
  }));
}

export async function GET(
  req: Request,
  { params }: { params: { nickname: string } }
) {
  const { nickname } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { password, ...userInfo } = user;

    const weeklyWaterData = await getWeeklyWaterConsumption(user.id);

    return NextResponse.json({
      userInfo,
      weeklyWaterData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
