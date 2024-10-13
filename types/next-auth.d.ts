declare module "next-auth" {
  interface User {
    id: string;
    nickname?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    nickname?: string | null;
  }
}
