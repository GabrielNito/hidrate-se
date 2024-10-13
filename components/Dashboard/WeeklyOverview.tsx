"use client";
import { useState, useEffect } from "react";
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
import { eachDayOfInterval, subDays, format } from "date-fns";
type WaterEntry = {
  id: string;
  date: string;
  glasses: number;
  userId: string;
};
export default function WeeklyOverview() {
  const fetchWeeklyWaterConsumption = async () => {
    const response = await fetch("/api/weekly-water-consumption");
    if (!response.ok) {
      throw new Error("Failed to fetch weekly water consumption");
    }
    return response.json();
  };
  fetchWeeklyWaterConsumption();
  const aggregateData = (entries: WaterEntry[]) => {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 6);
    const allDays = eachDayOfInterval({ start: sevenDaysAgo, end: today }).map(
      (date) => format(date, "MM/dd")
    );
    const aggregated = Object.fromEntries(allDays.map((date) => [date, 0]));
    entries.forEach((entry) => {
      const formattedDate = format(new Date(entry.date), "MM/dd");
      if (aggregated[formattedDate] !== undefined) {
        aggregated[formattedDate] += entry.glasses * 250;
      }
    });
    return Object.entries(aggregated).map(([date, glasses]) => ({
      date,
      glasses,
    }));
  };
  const [chartData, setChartData] = useState<
    { date: string; glasses: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const entries = await fetchWeeklyWaterConsumption();
        console.log(entries);
        const aggregatedData = aggregateData(entries);
        console.log(aggregatedData);
        setChartData(aggregatedData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  const chartConfig = {
    glasses: {
      label: "ml",
      color: "hsl(var(--chart-1))",
    },
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Consumo de Água</CardTitle>
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
