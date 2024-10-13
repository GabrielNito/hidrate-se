"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { eachDayOfInterval, subDays, format, parseISO } from "date-fns";

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

export default function WeeklyOverview() {
  const { nickname } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chartData, setChartData] = useState<
    { date: string; glasses: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!nickname) return;

      try {
        const res = await fetch(`/api/user/${nickname}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          const aggregatedData = aggregateData(data.weeklyWaterData);
          setChartData(aggregatedData);
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [nickname]);

  const aggregateData = (weeklyWaterData: WaterData[]) => {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 6);

    const allDays = eachDayOfInterval({ start: sevenDaysAgo, end: today }).map(
      (date) => format(date, "MM/dd")
    );

    const aggregated = Object.fromEntries(allDays.map((date) => [date, 0]));

    weeklyWaterData.forEach((entry) => {
      const formattedDate = format(parseISO(entry.date), "MM/dd");
      if (aggregated[formattedDate] !== undefined) {
        aggregated[formattedDate] += entry.glasses * 250; // Convert glasses to ml
      }
    });

    return Object.entries(aggregated).map(([date, glasses]) => ({
      date,
      glasses,
    }));
  };

  const chartConfig = {
    glasses: {
      label: "ml",
      color: "hsl(var(--chart-1))",
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data available</div>;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Consumo de Água - {userData.userInfo.name}</CardTitle>
        <CardDescription>
          Quantidade de Água consumida nos últimos 7 dias (em ml)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="glasses"
                stroke="var(--color-glasses)"
                strokeWidth={2}
                dot={{ fill: "var(--color-glasses)", r: 4 }}
                activeDot={{ r: 6 }}
                name="ml"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
