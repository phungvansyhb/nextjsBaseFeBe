import bcrypt from "bcrypt";
import {AuthOptions, Session, getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/shared/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],


  callbacks: {
    async jwt({ token, user,account , profile, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
      }
      if (user) {
        return {
          ...profile,
          role: user.role,
          id: user.id,
        };
      }else {
        const user = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
        });
        return {
          ...token , ...user
        }
      }
    },

    async session({ session, token,user }) {
      const sessionObj =  {
        ...session,
        user: {
          ...token,
          role: token.role,
          id: token.id,
        },
      } as Session;
      // @ts-ignore
      delete sessionObj.user.hashedPassword
      return sessionObj
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: `/login`,
    signOut: `/register`
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export const serverSession = async () => await getServerSession(authOptions)