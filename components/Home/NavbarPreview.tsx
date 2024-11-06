"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { GlassWater, Search, User2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function NavbarPreview() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    nickname: "johndoe",
  };

  return (
    <div className="flex w-full px-12 py-4 max-md:px-4 items-center justify-between">
      <Button variant="ghost" asChild size="icon">
        <GlassWater className="w-6 h-6" />
      </Button>
      <div className="flex-1 max-w-sm mx-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Procurar usuário..."
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
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Avatar>
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase() || (
                    <User2 className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col gap-2">
              <h1>{user.name}</h1>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  @{user.nickname}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
