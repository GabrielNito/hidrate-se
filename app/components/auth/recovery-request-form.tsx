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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Endereço de e-mail inválido.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function RecoveryRequestForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    console.log(values.email);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        toast({
          title: "Email enviado",
          description: `Cheque seu email para redefinir a sua senha. ${data.message} Você será redirecionado automaticamente para a página de Login`,
        });

        setTimeout(() => {
          router.push("/login");
        }, 10000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <Card className="w-full max-w-md flex flex-col items-center">
      <CardHeader className="w-full">
        <CardTitle>Recuperar senha</CardTitle>
        <CardDescription>
          Insira seu email abaixo. Caso o email pertença a uma conta existente,
          um link para redefinição de senha será enviado em seu email.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      {...field}
                      autoFocus
                      disabled={isLoading}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
