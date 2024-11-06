"use client";

import * as React from "react";
import { Laptop2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Trocar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-1 items-center"
          onClick={() => setTheme("light")}
        >
          <Sun className="w-4 h-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-1 items-center"
          onClick={() => setTheme("dark")}
        >
          <Moon className="w-4 h-4" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-1 items-center"
          onClick={() => setTheme("system")}
        >
          <Laptop2 className="w-4 h-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
