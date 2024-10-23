import { Card, CardHeader } from "@/components/ui/card";
import { UserX2 } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";

export default function UserNotFound() {
  document.title = `Hidrate-se | Usuário não encontrado`;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
              <UserX2 size={24} />
            </div>
            <h1 className="text-lg font-semibold">Usuário não encontrado</h1>
            <p>Cheque o usuário e tente novamente</p>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
