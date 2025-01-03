"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ModeToggle } from "../mode-toggle";
import { GlassWater, LogIn, LogOut, Search, User2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function Navbar() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/user/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const user = session?.user;

  return (
    <div className="flex w-full px-12 py-4 max-md:px-4 items-center justify-between">
      <Button className="max-md:hidden" variant="ghost" asChild>
        <Link href="/" className="flex items-center gap-2">
          <GlassWater />
          <h1 className="text-lg font-medium">Hidrate-se</h1>
        </Link>
      </Button>
      <Button className="md:hidden" variant="ghost" asChild size="icon">
        <Link href="/" className="flex items-center gap-2">
          <GlassWater />
        </Link>
      </Button>
      <form onSubmit={handleSearch} className="flex-1 max-w-sm mx-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Procurar usuário..."
            value={searchQuery}
            onChange={handleInputChange}
            className="pr-8"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-2">
        <ModeToggle />

        {user && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleSignOut} variant="ghost" size="icon">
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sair</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href={user ? "/profile" : "/login"}>
                <Avatar>
                  <AvatarFallback>
                    {user?.name?.slice(0, 2).toUpperCase() || (
                      <User2 className="w-4 h-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            {user ? (
              <div className="flex flex-col gap-2">
                <h1>{user?.name}</h1>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-sm text-muted-foreground">
                    @{user?.nickname || "No nickname provided"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="py-2">Usuário não logado</h1>
                <Separator />
                <Button variant="ghost" className="flex gap-2 w-full" asChild>
                  <Link href="/login">
                    <LogIn className="w-4 h-4" />
                    Faça Login
                  </Link>
                </Button>
              </div>
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
