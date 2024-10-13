import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Trophy } from "lucide-react";

export default function Statistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas e Conquistas</CardTitle>
        <CardDescription>Seus marcos no consumo de água</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          <span>Sequência atual: 5 dias</span>
        </div>
        <div className="flex items-center mb-4">
          <Trophy className="h-5 w-5 mr-2 text-blue-500" />
          <span>Melhor semana: 56 copos</span>
        </div>
        <div className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-green-500" />
          <span>Meta de 30 dias atingida: 2 vezes</span>
        </div>
      </CardContent>
    </Card>
  );
}
