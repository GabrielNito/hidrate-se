"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface User {
  id: string;
  nickname: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function User() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl">
              <Skeleton className="h-8 w-[10ch]" />
            </CardTitle>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-[9ch]" />
              </div>
              <div className="text-sm text-muted-foreground">
                <Skeleton className="h-4 w-[15ch]" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  const user = session?.user as User;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-2xl">
            {user?.name || "Anonymous User"}
          </CardTitle>
          <div className="flex flex-col">
            <div className="text-sm text-muted-foreground flex gap-1 items-center">
              @{user?.nickname || "No nickname provided"}
              <Button
                variant="link"
                className="p-0 h-fit text-muted-foreground"
              >
                <Copy
                  className="w-4 h-4"
                  onClick={() => navigator.clipboard.writeText(user?.nickname)}
                />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {user?.email || "No email provided"}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
