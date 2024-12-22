import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      image: string;
      email?: string;
      role: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    image: string;
    email?: string;
    role?: string | null;
    role: string | null;
  }
}
