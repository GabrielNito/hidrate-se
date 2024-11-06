"use client";

import { Button } from "@/components/ui/button";
import DashboardPreview from "../components/Home/DashboardPreview";
import DashboardPreviewLeft from "../components/Home/DashboardPreviewLeft";
import NavbarPreview from "@/components/Home/NavbarPreview";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <section>
      <Navbar />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-4 py-20">
          <h1 className="text-5xl font-semibold tracking-tight">Hidrate-se</h1>
          <p className="text-lg text-muted-foreground max-w-1/2">
            Hidratação Simplificada - Acompanhe, Gerencie e Compartilhe sua
            Ingestão de Água
          </p>

          <Button className="text-2xl px-8 py-6">
            Comece a utilizar agora
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 overflow-x-visible">
        <div className="flex flex-col justify-center items-end gap-2 px-20">
          <h1 className="max-w-2/3 text-right text-2xl font-semibold">
            Acompanhamento eficiente de hidratação
          </h1>
          <p className="max-w-2/3 text-right text-muted-foreground">
            O Hidrate-se coloca sua ingestão de água na ponta dos dedos
          </p>
        </div>

        <DashboardPreview />
      </div>

      <div className="grid lg:grid-cols-2 overflow-x-visible">
        <DashboardPreviewLeft />

        <div className="flex flex-col justify-center items-start gap-2 px-20">
          <h1 className="max-w-2/3 text-left text-2xl font-semibold">
            Centro de Hidratação Pessoal
          </h1>
          <p className="max-w-2/3 text-left text-muted-foreground">
            Acompanhe sua ingestão de água diária e semanal
          </p>
        </div>
      </div>
    </section>
  );
}
