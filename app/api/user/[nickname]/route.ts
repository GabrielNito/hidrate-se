import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Helper function to get the last 7 days of water consumption
async function getWeeklyWaterConsumption(userId: string) {
  // Set sevenDaysAgo to midnight 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0); // Set to the start of the day

  // Set today to midnight (start of the current day)
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set to the end of the day

  const weeklyData = await prisma.waterEntry.findMany({
    where: {
      userId: userId,
      date: {
        gte: sevenDaysAgo,
        lte: today, // Include records up to the end of the current day
      },
    },
    orderBy: {
      date: "asc", // Sort records by ascending date
    },
  });

  return weeklyData.map((entry) => ({
    date: entry.date,
    glasses: entry.glasses || 0, // Ensure glasses value is set to 0 if undefined
  }));
}

export async function GET(
  req: Request,
  { params }: { params: { nickname: string } }
) {
  const { nickname } = params;

  try {
    // Find the user by nickname
    const user = await prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { password, ...userInfo } = user;

    // Fetch weekly water consumption for the user
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
