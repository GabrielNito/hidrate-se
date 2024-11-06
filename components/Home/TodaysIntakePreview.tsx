"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";

export default function TodaysIntakePreview() {
  const [glasses, setGlasses] = useState(3);
  const [goal, setGoal] = useState(8);
  const [loading, setLoading] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(false);

  const cupSize = 250;
  const totalMl = glasses * cupSize;
  const totalGoalMl = goal * cupSize;

  const addGlass = () => {
    if (glasses >= goal) return;
    setLoading(true);
    setTimeout(() => {
      setGlasses((prev) => prev + 1);
      setLoading(false);
      toast.success("Glass of water added successfully");
    }, 500);
  };

  const removeGlass = () => {
    if (glasses <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setGlasses((prev) => prev - 1);
      setLoading(false);
      toast.success("Glass of water removed successfully");
    }, 500);
  };

  const handleDecreaseGoal = () => {
    if (goal > 1 && !updatingGoal) {
      setUpdatingGoal(true);
      setTimeout(() => {
        setGoal((prev) => prev - 1);
        setUpdatingGoal(false);
        toast.success("Water goal updated successfully");
      }, 500);
    }
  };

  const handleIncreaseGoal = () => {
    if (!updatingGoal) {
      setUpdatingGoal(true);
      setTimeout(() => {
        setGoal((prev) => prev + 1);
        setUpdatingGoal(false);
        toast.success("Water goal updated successfully");
      }, 500);
    }
  };

  return (
    <div className="max-md:flex max-md:flex-col max-md:gap-4 md:grid md:grid-cols-2 md:gap-4">
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
