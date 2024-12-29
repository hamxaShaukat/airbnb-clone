import {prisma} from "@/lib/prismadb";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email as string;
        const password = credentials.password as string;



        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
    
          throw new Error("No user found with the email");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,

          role: user.role || "guest", // Provide a default value if role is null
          avatar: user.avatar || "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (trigger === "update") {
        // Fetch the latest user data from the database
        const updatedUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });
        if (updatedUser) {
          // Update the token with the latest user data
          token.name = updatedUser.name;
          token.email = updatedUser.email;
          token.role = updatedUser.role;
          token.avatar = updatedUser.avatar;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!account) {
        
        return false;
      }

      if (account.provider === "credentials") {
        
        return true;
      }

      if (account.provider === "google" || account.provider === "github") {
        const email = profile?.email as string;
        const name = profile?.name ?? "";

        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email,
              name,
              hashedPassword: "",
              role: "guest",
            },
          });
        } else {
          await prisma.user.update({
            where: { email },
            data: {
              name,
            },
          });
        }
        user.role = existingUser.role;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});
