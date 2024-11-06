"use client";

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

export default function WeeklyOverviewPreview() {
  // Mock data for the chart
  const chartData = [
    { date: "05/01", glasses: 1500 },
    { date: "05/02", glasses: 1750 },
    { date: "05/03", glasses: 2000 },
    { date: "05/04", glasses: 1250 },
    { date: "05/05", glasses: 1800 },
    { date: "05/06", glasses: 2250 },
    { date: "05/07", glasses: 2000 },
  ];

  const chartConfig = {
    glasses: {
      label: "ml",
      color: "hsl(var(--chart-1))",
    },
  };

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
