"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, Copy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NavbarPreview from "./NavbarPreview";
import { Progress } from "../ui/progress";

interface UserInfo {
  id: string;
  name: string;
  nickname: string;
  email: string;
  createdAt: string;
  waterGoal: number;
}

interface WaterData {
  date: string;
  glasses: number;
}

interface UserData {
  userInfo: UserInfo;
  weeklyWaterData: WaterData[];
}

// Mockup Data
const mockUserData: UserData = {
  userInfo: {
    id: "1",
    name: "John Doe",
    nickname: "johnd",
    email: "john@example.com",
    createdAt: "2023-01-01",
    waterGoal: 14,
  },
  weeklyWaterData: [
    { date: "2024-11-01", glasses: 20 },
    { date: "2024-11-02", glasses: 10 },
    { date: "2024-11-03", glasses: 30 },
    { date: "2024-11-04", glasses: 9 },
    { date: "2024-11-05", glasses: 10 },
    { date: "2024-11-06", glasses: 3 },
    { date: "2024-11-07", glasses: 10 },
  ],
};

export default function DashboardUser() {
  const { userInfo, weeklyWaterData } = mockUserData;

  const totalWeeklyGlasses = weeklyWaterData.reduce(
    (sum, day) => sum + day.glasses,
    0
  );
  const averageDailyGlasses = totalWeeklyGlasses / 7;
  const percentageOfGoal = (averageDailyGlasses / userInfo.waterGoal) * 100;

  return (
    <>
      <NavbarPreview />

      <div className="container mx-auto p-6 space-y-6 flex justify-center">
        <div className="w-full flex flex-col gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback>
                  {userInfo.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl">{userInfo.name}</CardTitle>
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground flex gap-1 items-center">
                    @{userInfo.nickname}
                    <Button
                      variant="link"
                      className="p-0 h-fit text-muted-foreground"
                    >
                      <Copy
                        className="w-4 h-4"
                        onClick={() =>
                          navigator.clipboard.writeText(userInfo.nickname)
                        }
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DropletIcon className="w-5 h-5 mr-2 text-blue-500" />
                Estatisticas de Consumo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Média por semana</span>
                  <span>{percentageOfGoal.toFixed(1)}% da meta</span>
                </div>
                <Progress value={percentageOfGoal} />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {averageDailyGlasses.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Copos por dia em média
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {totalWeeklyGlasses}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Copos essa semana
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
