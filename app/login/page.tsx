"use client";

import { Button } from "@/components/ui/button";
import { LoginForm } from "../components/auth/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    document.title = "Hidrate-se | Login";
  }, []);

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-4">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <p className="text-sm">Ainda não tem uma conta?</p>
        <Button variant="outline" onClick={() => router.push("/register")}>
          Crie uma
        </Button>
      </div>
      <LoginForm />
    </div>
  );
}
