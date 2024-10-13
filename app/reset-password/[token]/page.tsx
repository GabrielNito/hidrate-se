import { RecoveryForm } from "@/app/components/auth/recovery-form";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-4">
      <RecoveryForm />
      <Toaster />
    </div>
  );
}
