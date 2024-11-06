"use client";

import { Button } from "@/components/ui/button";
import DashboardPreview from "../components/Home/DashboardPreview";
import DashboardPreviewLeft from "../components/Home/DashboardPreviewLeft";
import DashboardPreviewUser from "@/components/Home/DashboardPreviewUser";
import NavbarHome from "@/components/Navbar/NavbarHome";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <section className="overflow-x-hidden">
      <NavbarHome />

      <div className="flex flex-col gap-4 relative">
        <div
          className="absolute inset-0 pointer-events-none w-1/2 h-[300px] left-1/4 top-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(var(--highlight) 0 , transparent 75%)",
          }}
        />
        <div className="z-10 flex flex-col justify-center items-center gap-4 py-20">
          <h1 className="text-5xl font-semibold tracking-tight">Hidrate-se</h1>
          <p className="max-lg:p-4 lg:text-lg text-muted-foreground max-w-1/2 max-lg:text-center">
            Hidratação Simplificada - Acompanhe, Gerencie e Compartilhe sua
            Ingestão de Água
          </p>
          <div className="flex flex-col gap-1 lg:gap-2 items-center">
            <Button className="text-2xl lg:px-8 lg:py-6 max-lg:text-lg" asChild>
              <Link href="/register">Comece a utilizar agora</Link>
            </Button>
            <div className="w-full flex gap-4 justify-center items-center">
              <Separator className="w-[40%] h-[1px] bg-muted-foreground" />
              <p className="text-muted-foreground">ou</p>
              <Separator className="w-[40%] h-[1px] bg-muted-foreground" />
            </div>
            <Button className="lg:text-lg" variant="link" asChild>
              <Link href={user ? "/dashboard" : "/login"}>
                Acesse sua conta
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-visible">
          <div className="flex flex-col justify-center items-end gap-2 px-20">
            <h1 className="max-w-2/3 lg:text-right text-2xl font-semibold">
              Acompanhamento eficiente de hidratação
            </h1>
            <p className="max-w-2/3 lg:text-right text-muted-foreground">
              O Hidrate-se coloca sua ingestão de água na ponta dos dedos
            </p>
          </div>

          <DashboardPreview />
        </div>

        <div className="max-lg:flex max-lg:flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 overflow-x-visible w-full">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-x-visible">
          <div className="flex flex-col justify-center items-end gap-2 px-20">
            <h1 className="max-w-2/3 lg:text-right text-2xl font-semibold">
              Conecte-se, Compita, Conquiste sua sede
            </h1>
            <p className="max-w-2/3 lg:text-right text-muted-foreground">
              O Hidrate-se traz uma comunidade de hidratação
            </p>
          </div>

          <DashboardPreviewUser />
        </div>
      </div>
    </section>
  );
}
