import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[100svh] bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive mb-4">
            <User2 size={24} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Usuário não logado
          </CardTitle>
          <CardDescription className="text-center">
            Você não está logado, e não tem permissão para acessar esta página.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center flex flex-col gap-2">
          <p className="text-muted-foreground">
            Faça login para acessar sua página. Ou então crie uma conta.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center flex gap-2">
          <Button variant="secondary" onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button variant="secondary" onClick={() => router.push("/register")}>
            Criar uma conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
