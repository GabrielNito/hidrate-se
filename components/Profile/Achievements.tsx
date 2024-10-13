"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrophyIcon } from "lucide-react";
import { User, WaterEntry } from "@prisma/client";
import { useEffect, useState } from "react";

interface Badge {
  title: string;
  description: string;
}

export function generateBadges(
  user: User,
  waterEntries: WaterEntry[]
): Badge[] {
  const badges: Badge[] = [];

  const accountAgeBadge = getAccountAgeBadge(user.createdAt);
  if (accountAgeBadge) badges.push(accountAgeBadge);

  // Check for consistency
  const consistencyBadge = getConsistencyBadge(waterEntries);
  if (consistencyBadge) badges.push(consistencyBadge);

  // Check for goal achievement
  const goalAchievementBadge = getGoalAchievementBadge(
    user.waterGoal,
    waterEntries
  );
  if (goalAchievementBadge) badges.push(goalAchievementBadge);

  // Check for total water consumption
  const totalConsumptionBadge = getTotalConsumptionBadge(waterEntries);
  if (totalConsumptionBadge) badges.push(totalConsumptionBadge);

  return badges;
}

function getAccountAgeBadge(createdAt: Date): Badge | null {
  const ageInDays = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  if (ageInDays >= 365) {
    return {
      title: "Veterano da Hidratação",
      description: "Membro há um ano ou mais",
    };
  } else if (ageInDays >= 30) {
    return {
      title: "Usuário Dedicado",
      description: "Membro há um mês ou mais",
    };
  }
  return null;
}

function getConsistencyBadge(entries: WaterEntry[]): Badge | null {
  const sortedEntries = entries.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  let streak = 0;
  let currentDate = new Date();

  for (const entry of sortedEntries) {
    if (entry.date.toDateString() === currentDate.toDateString()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  if (streak >= 30) {
    return {
      title: "Mestre da Consistência",
      description: "30 dias consecutivos de registro",
    };
  } else if (streak >= 7) {
    return {
      title: "Hábito Saudável",
      description: "7 dias consecutivos de registro",
    };
  }
  return null;
}

function getGoalAchievementBadge(
  goal: number,
  entries: WaterEntry[]
): Badge | null {
  const achievedDays = entries.filter((entry) => entry.glasses >= goal).length;
  if (achievedDays >= 30) {
    return {
      title: "Conquistador de Metas",
      description: "Atingiu a meta diária por 30 dias",
    };
  } else if (achievedDays >= 7) {
    return {
      title: "Em Busca da Excelência",
      description: "Atingiu a meta diária por 7 dias",
    };
  }
  return null;
}

function getTotalConsumptionBadge(entries: WaterEntry[]): Badge | null {
  const totalGlasses = entries.reduce((sum, entry) => sum + entry.glasses, 0);
  if (totalGlasses >= 1000) {
    return {
      title: "Hidratação Lendária",
      description: "Consumiu mais de 1000 copos de água",
    };
  } else if (totalGlasses >= 500) {
    return {
      title: "Hidratação Notável",
      description: "Consumiu mais de 500 copos de água",
    };
  }
  return null;
}

export default function Achievements({ userId }: { userId: string }) {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUserData?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          const generatedBadges = generateBadges(data.user, data.user.entries);
          setBadges(generatedBadges);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrophyIcon className="w-5 h-5 mr-2 text-amber-500" />
          Conquistas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 h-full">
          {badges && (
            <div className="w-full h-full text-center text-sm text-muted-foreground top-[50%]naaq">
              <h1>Parece que você ainda não possui nenhuma conquista</h1>
            </div>
          )}
          {badges.map((badge, index) => {
            return (
              <Badge key={index} variant="secondary" title={badge.description}>
                {badge.title}
              </Badge>
            );
          })}
          {/* <Badge variant="secondary">Economizador de Água Iniciante</Badge>
          <Badge variant="secondary">Sequência de 30 Dias</Badge>
          <Badge variant="secondary">Detetive de Vazamentos</Badge>
          <Badge variant="secondary">Educador Comunitário</Badge>
          <Badge variant="secondary">Herói da Água da Chuva</Badge> */}
        </div>
      </CardContent>
    </Card>
  );
}
