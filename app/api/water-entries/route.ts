import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get date from query params or use today
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");
    const date = dateParam ? new Date(dateParam) : new Date();

    // Set time to start of day
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    // Set time to end of day
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const entry = await prisma.waterEntry.findFirst({
      where: {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return NextResponse.json(entry || { glasses: 0, date: startDate });
  } catch (error) {
    console.error("Error fetching water entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { glasses } = body;

    if (typeof glasses !== "number" || glasses < 0) {
      return NextResponse.json(
        { error: "Invalid number of glasses" },
        { status: 400 }
      );
    }

    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Try to find an existing entry for today
    let entry = await prisma.waterEntry.findFirst({
      where: {
        userId: user.id,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Next day
        },
      },
    });

    if (entry) {
      // Update existing entry
      entry = await prisma.waterEntry.update({
        where: { id: entry.id },
        data: { glasses },
      });
    } else {
      // Create new entry for today
      entry = await prisma.waterEntry.create({
        data: {
          glasses,
          userId: user.id,
          date: today,
        },
      });
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error updating water entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
