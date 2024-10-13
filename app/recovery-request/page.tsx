import { Toaster } from "@/components/ui/toaster";
import { RecoveryRequestForm } from "../components/auth/recovery-request-form";

export default function page() {
  return (
    <div className="relative min-h-[100svh] flex items-center justify-center px-4">
      <RecoveryRequestForm />
      <Toaster />
    </div>
  );
}
