import { RecoveryForm } from "@/app/components/auth/recovery-form";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  document.title = "Hidrate-se | Recuperação de Senha";

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-4">
      <RecoveryForm />
      <Toaster />
    </div>
  );
}
