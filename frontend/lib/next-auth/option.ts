import { PrismaAdapter } from "@auth/prisma-adapter"
import Github from "next-auth/providers/github"
import { prisma } from "../prisma"
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import Google from "next-auth/providers/google"


export const nextAuthOptions:NextAuthOptions = {
  debug: false,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session: async ({session, user}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
  secret: process.env.NEXT_SECRET!,
}
