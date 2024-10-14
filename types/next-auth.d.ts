import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    nickname?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
      nickname?: string | null;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    nickname?: string | null;
  }
}
