/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "../api";
import { jwtDecode } from "jwt-decode";

interface UserWithToken extends User {
  token: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;

          console.log("credentials", email, password);

          const response = await fetch(`${api}/api/sessions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      if (user.token) {
        return true;
      } else {
        return false;
      }
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        const userWithToken = user as UserWithToken;
        const userToken = jwtDecode(userWithToken.token) as typeof token.user;

        token.id = userWithToken.id;
        token.token = userWithToken.token;
        token.user = userToken;
      }

      if (trigger === "update" && session?.info) {
        // @ts-expect-error
        token.user = { ...token.user, ...session.info };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // @ts-expect-error
        session.token = token.token as string;
        // @ts-expect-error
        session.user = token.user;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
});
