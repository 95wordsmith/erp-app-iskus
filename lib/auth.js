import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { compare } from "bcrypt";
export const authOptions = {
  adapter: PrismaAdapter(),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
    
      name: "Credentials",
      
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          username: existingUser.username,
          role: existingUser.role,
        };
      },
    }),
  ],
  callbacks:{
    async jwt({ token, user }) {
     
      if(user){
        return {
          ...token,
          id:user.id,
          username:user.username,
          role:user.role
        }
      }
      return token
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user:{
          ...session.user,
          id:token.id,
          username:token.username,
          role:token.role
        }
      }
      return session
    },
  }
};
