"use client";

import { useRouter } from "next/navigation";
import { RegisterForm } from "../components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Hidrate-se | Cadastro";
  }, []);

  return (
    <section className="min-h-[100svh]">
      <div className="w-full px-8 py-4 flex justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <Home />
          </Link>
        </Button>

        <div className="flex gap-2 items-center">
          <p className="text-sm">Já tem uma conta?</p>
          <Button variant="outline" onClick={() => router.push("/register")}>
            Faça login
          </Button>
        </div>
      </div>
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4">
        <RegisterForm />
      </div>
      <Toaster />
    </section>
  );
}
