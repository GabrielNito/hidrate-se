"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  nickname: z.string().min(3, {
    message: "O apelido deve ter pelo menos 3 caracteres.",
  }),
  waterIntake: z.string().min(1, {
    message: "O consumo de água é obrigatório.",
  }),
  email: z.string().email({
    message: "Endereço de e-mail inválido.",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter pelo menos 8 caracteres.",
  }),
});

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(1);
  const [weight, setWeight] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nickname: "",
      waterIntake: "",
      email: "",
      password: "",
    },
  });

  const handleNext = () => {
    if (stage === 1 && form.getValues("name")) {
      setStage(2);
    } else if (stage === 2 && form.getValues("waterIntake")) {
      setStage(3);
    }
  };

  const handlePrevious = () => {
    setStage((prev) => Math.max(prev - 1, 1));
  };

  const calculateWaterIntake = () => {
    const weightInKg = parseFloat(weight);
    if (!isNaN(weightInKg)) {
      const intake = Math.round(weightInKg * 35);
      form.setValue("waterIntake", intake.toString());
      setIsDialogOpen(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Erro",
          description: result.error || "Falha no registro",
        });
        return;
      }

      toast({
        title: "Registro Concluído",
        description: "Sua conta foi criada com sucesso!",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      toast({ title: "Erro", description: "Algo deu errado" });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Registrar-se</CardTitle>
        <CardDescription>Crie sua conta em 3 etapas simples.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {stage === 1 && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {stage === 2 && (
              <FormField
                control={form.control}
                name="waterIntake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo Diário de Água (ml)</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input type="number" placeholder="2000" {...field} />
                      </FormControl>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline">Calcular</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Calcular Consumo de Água</DialogTitle>
                            <DialogDescription>
                              Insira seu peso para calcular a meta de consumo de
                              água.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <FormLabel
                                htmlFor="weight"
                                className="text-right"
                              >
                                Peso (kg)
                              </FormLabel>
                              <Input
                                id="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={calculateWaterIntake}>
                              Calcular e Fechar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {stage === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apelido</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu apelido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {stage > 1 && (
          <Button variant="outline" onClick={handlePrevious}>
            Anterior
          </Button>
        )}
        {stage < 3 ? (
          <Button onClick={handleNext}>Próximo</Button>
        ) : (
          <Button onClick={form.handleSubmit(onSubmit)} type="submit">
            Registrar-se
          </Button>
        )}
      </CardFooter>
      <div className="flex justify-center pb-4">
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${
                step <= stage ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
