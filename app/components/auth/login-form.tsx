"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Endereço de e-mail inválido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      // Renamed 'error' to 'err'
      setError("Algo deu errado");
    }
  }

  return (
    <Card className="w-full max-w-md flex flex-col items-center">
      <CardHeader className="w-full">
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Digite suas credenciais para acessar sua conta
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
                    <Input placeholder="seu@email.com" {...field} autoFocus />
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
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex justify-between">
              <Button
                variant="link"
                className="px-1"
                type="button"
                onClick={() => router.push("/recovery-request")}
              >
                Esqueci minha senha
              </Button>
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
