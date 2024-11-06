"use client";

import { Button } from "@/components/ui/button";
import { LoginForm } from "../components/auth/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    document.title = "Hidrate-se | Login";
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
          <p className="text-sm">Ainda não tem uma conta?</p>
          <Button variant="outline" onClick={() => router.push("/register")}>
            Crie uma
          </Button>
        </div>
      </div>
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4">
        <LoginForm />
      </div>
    </section>
  );
}
