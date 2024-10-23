"use client";

import { useRouter } from "next/navigation";
import { RegisterForm } from "../components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Hidrate-se | Cadastro";
  }, []);

  return (
    <div className="min-h-[100svh] flex items-center justify-center px-4">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <p className="text-sm">Já tem uma conta?</p>
        <Button variant="outline" onClick={() => router.push("/login")}>
          Faça Login
        </Button>
      </div>
      <RegisterForm />

      <Toaster />
    </div>
  );
}
