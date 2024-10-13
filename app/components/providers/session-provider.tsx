"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface CustomSession extends Session {
  expires: string;
}

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: CustomSession | null | undefined;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
