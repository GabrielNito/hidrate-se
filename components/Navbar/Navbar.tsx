"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { GlassWater, LogOut } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Navbar() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const user = session?.user;

  return (
    <div className="flex w-full px-12 py-4 max-md:px-4 flex items-center justify-between">
      <Button variant="ghost" asChild>
        <Link href="/" className="flex items-center gap-2">
          <GlassWater />
          <h1 className="text-lg font-medium">Hidrate-se</h1>
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button onClick={handleSignOut} variant="ghost" size="icon">
          <LogOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/profile">
            <Avatar>
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </Button>
      </div>
    </div>
  );
}
