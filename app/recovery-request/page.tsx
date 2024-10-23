import { Toaster } from "@/components/ui/toaster";
import { RecoveryRequestForm } from "../components/auth/recovery-request-form";
import { useEffect } from "react";

export default function page() {
  useEffect(() => {
    document.title = "Hidrate-se | Recuperação de Senha";
  }, []);

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-4">
      <RecoveryRequestForm />
      <Toaster />
    </div>
  );
}
