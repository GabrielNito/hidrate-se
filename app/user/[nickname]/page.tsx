"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DropletIcon, Copy } from "lucide-react";
import WeeklyOverview from "@/components/User/Chart";
import Navbar from "@/components/Navbar/Navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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

export default function PublicProfile() {
  const { nickname } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!nickname) return;

      try {
        const res = await fetch(`/api/user/${nickname}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [nickname]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!userData) {
    return <div className="text-center text-lg">User not found</div>;
  }

  const { userInfo, weeklyWaterData } = userData;

  const totalWeeklyGlasses = weeklyWaterData.reduce(
    (sum, day) => sum + day.glasses,
    0
  );
  const averageDailyGlasses = totalWeeklyGlasses / 7;
  const percentageOfGoal = (averageDailyGlasses / userInfo.waterGoal) * 100;

  document.title = `Hidrate-se | ${userInfo.name}`;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 space-y-6 flex justify-center">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback>
                  {userInfo.name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl">
                  {userInfo.name || "Anonymous User"}
                </CardTitle>
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground flex gap-1 items-center">
                    @{userInfo.nickname || "No nickname provided"}
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

          <WeeklyOverview />
        </div>
      </div>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-col">
            <Skeleton className="h-8 w-[200px] mb-2" />
            <Skeleton className="h-4 w-[150px] mb-1" />
            <Skeleton className="h-4 w-[200px] mb-1" />
            <Skeleton className="h-4 w-[180px] mt-2" />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[250px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
