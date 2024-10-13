"use client";

import React, { useEffect, useState } from "react";
import { DropletIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";

interface WaterStats {
  thisMonthTotal: number;
  percentageOfGoal: number;
  percentageChange: number;
}

export default function Statistics({ userId }: { userId: string }) {
  const [stats, setStats] = useState<WaterStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/getWaterStats?userId=${userId}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          const data = await response.json();
          console.log(data);
          console.error("Failed to fetch water stats");
        }
      } catch (error) {
        console.error("Error fetching water stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DropletIcon className="w-5 h-5 mr-2 text-blue-500" />
            Estatísticas de Uso de Água
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <Skeleton className="h-4 w-[8ch]" />
                <span>
                  <Skeleton className="h-4 w-[11ch]" />
                </span>
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-4 w-[13ch]" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-4 w-[13ch]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return <div>Falha ao carregar dados</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DropletIcon className="w-5 h-5 mr-2 text-blue-500" />
          Estatísticas de Consumo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Este Mês</span>
              <span>{stats.percentageOfGoal}% da meta</span>
            </div>
            <Progress value={stats.percentageOfGoal} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">
                {(stats.thisMonthTotal / 1000).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                Litros consumidos
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.abs(stats.percentageChange)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.percentageChange >= 0 ? "Aumento" : "Redução"} do Mês
                Passado
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
