import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } // Verifica se o usuário está logado na sessão

    const userId = session.user.id; // Id do usuário

    // Set sevenDaysAgo to midnight 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Define 7 dias atrás à meia-noite

    // Set today to midnight (start of the current day)
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Define a data atual até o final do dia

    const weeklyData = await prisma.waterEntry.findMany({
      where: {
        userId: userId,
        date: {
          gte: sevenDaysAgo,
          lte: today, // Inclui registros até o final do dia atual
        },
      },
      orderBy: {
        date: "asc", // Ordena os registros por data ascendente
      },
    });

    const formattedData = weeklyData.map((entry) => ({
      name: new Date(entry.date).toLocaleDateString("pt-BR", {
        weekday: "short",
      }),
      glasses: entry.glasses || 0, // Agora acessamos diretamente o valor de glasses
    }));

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
