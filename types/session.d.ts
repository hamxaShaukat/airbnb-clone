import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      avatar: string;
      email?: string;
      role: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    avatar: string;
    email?: string;
    role?: string | null;
    role: string | null;
  }
}
