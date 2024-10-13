"use client";

import { useSession } from "next-auth/react";
import TodaysIntake from "@/components/Dashboard/TodaysIntake";
import WeeklyOverview from "@/components/Dashboard/WeeklyOverview";
import Navbar from "@/components/Navbar/Navbar";
import LoadingPage from "./components/auth/LoadingPage";
import AccessDenied from "./components/auth/AccessDenied";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingPage />;
  if (status === "unauthenticated") return <AccessDenied />;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col items-center ">
        {/* <h1 className="text-3xl font-bold mb-6">Ingestão de Água</h1> */}

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <TodaysIntake />

          <WeeklyOverview />
        </div>

        {/* <Card className="mt-4 md:w-1/2 max-md:w-full">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>
              Análise detalhada do seu consumo de água
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily">
              <TabsList>
                <TabsTrigger value="daily">Diário</TabsTrigger>
                <TabsTrigger value="weekly">Semanal</TabsTrigger>
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <p>Em média, você bebe 4 copos de água por dia.</p>
                <p>Seu melhor momento para beber água é pela manhã.</p>
              </TabsContent>
              <TabsContent value="weekly">
                <p>
                  Esta semana você consumiu{" "}
                  {weekData.reduce((acc, day) => acc + day.amount, 0)} copos de
                  água
                </p>
                <p>
                  Você tende a beber mais água nos dias de semana em comparação
                  com os fins de semana.
                </p>
              </TabsContent>
              <TabsContent value="monthly">
                <p>
                  Este mês, você atingiu sua meta diária{" "}
                  {Math.floor(Math.random() * 20) + 10} vezes.
                </p>
                <p>
                  Seu consumo de água melhorou 15% em comparação com o mês
                  passado.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card> */}
      </div>
    </>
  );
}
