"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ChartConfig } from "../ui/chart";

interface ChartData {
  ml: number;
  fill: string;
}

export default function TodaysIntake() {
  const { data: session, status } = useSession();
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(false);
  const [goalProgress, setGoalProgress] = useState<ChartData[]>([]);

  const progressAngle = Math.min((glasses / goal) * 360, 360);

  const goalConfig = {
    ml: {
      label: "ml",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const cupSize = 250;
  const totalMl = glasses * cupSize;
  const totalGoalMl = goal * cupSize;

  useEffect(() => {
    if (session) {
      fetchTodaysEntries();
      fetchUserGoal();
    }
  }, [session]);

  useEffect(() => {
    setGoalProgress([
      {
        ml: totalMl,
        fill: "hsl(var(--chart-2))",
      },
    ]);
  }, [totalMl]);

  const fetchUserGoal = async () => {
    try {
      const response = await fetch("/api/water-goal");
      if (!response.ok) throw new Error("Failed to fetch goal");

      const data = await response.json();
      setGoal(data.goal);
    } catch (error) {
      console.error("Error fetching goal:", error);
      toast.error("Failed to fetch water goal");
    }
  };

  const updateUserGoal = async (newGoal: number) => {
    setUpdatingGoal(true);
    try {
      const response = await fetch("/api/water-goal", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: newGoal }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update goal");
      }

      const data = await response.json();
      setGoal(data.goal);
      toast.success("Water goal updated successfully");
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update water goal"
      );
    } finally {
      setUpdatingGoal(false);
    }
  };

  const fetchTodaysEntries = async () => {
    if (!session) return;

    try {
      const response = await fetch("/api/water-entries");
      if (!response.ok) throw new Error("Failed to fetch entries");

      const entry = await response.json();

      if (entry && typeof entry.glasses === "number") {
        setGlasses(entry.glasses);
      } else {
        // If no entry for today or invalid data, set glasses to 0
        setGlasses(0);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Failed to fetch water entries");
      // Set glasses to 0 in case of error
      setGlasses(0);
    }
  };

  const addGlass = async () => {
    if (glasses >= goal) return;

    setLoading(true);
    try {
      const response = await fetch("/api/water-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ glasses: glasses + 1 }),
      });

      if (!response.ok) throw new Error("Failed to add glass");

      const updatedEntry = await response.json();
      setGlasses(updatedEntry.glasses);
      toast.success("Glass of water added successfully");
    } catch (error) {
      console.error("Error adding glass:", error);
      toast.error("Failed to add glass of water");
    } finally {
      setLoading(false);
    }
  };

  const removeGlass = async () => {
    if (glasses <= 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/water-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ glasses: glasses - 1 }),
      });

      if (!response.ok) throw new Error("Failed to remove glass");

      const updatedEntry = await response.json();
      setGlasses(updatedEntry.glasses);
      toast.success("Glass of water removed successfully");
    } catch (error) {
      console.error("Error removing glass:", error);
      toast.error("Failed to remove glass of water");
    } finally {
      setLoading(false);
    }
  };

  const handleDecreaseGoal = async () => {
    if (goal > 1 && !updatingGoal) {
      await updateUserGoal(goal - 1);
    }
  };

  const handleIncreaseGoal = async () => {
    if (!updatingGoal) {
      await updateUserGoal(goal + 1);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to track your water intake</div>;
  }

  return (
    <div className="max-md:flex max-md:flex-col max-md:gap-4 132 md:grid md:grid-cols-2 md:gap-4">
      <Card className="row-span-1">
        <CardHeader>
          <CardTitle>Consumo de Hoje</CardTitle>
          <CardDescription>Acompanhe seu consumo de água</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 flex gap-2">
            {glasses} / {goal} copos
            <sub className="text-sm text-muted-foreground">(250ml)</sub>
          </div>
          <Progress
            value={Math.min((glasses / goal) * 100, 100)}
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={removeGlass}
            variant="outline"
            size="icon"
            disabled={loading || glasses === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            onClick={addGlass}
            size="icon"
            disabled={loading || glasses >= goal}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="row-span-1">
        <CardHeader>
          <CardTitle>Meta</CardTitle>
          <CardDescription>Acompanhe seu consumo de água</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">
            {totalMl}
            <sub className="text-base">ml</sub> / {totalGoalMl}
            <sub className="text-base">ml</sub>
          </div>
          <Progress
            value={Math.min((glasses / goal) * 100, 100)}
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleDecreaseGoal}
            variant="outline"
            size="icon"
            disabled={updatingGoal || goal <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleIncreaseGoal}
            size="icon"
            disabled={updatingGoal}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
