import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "../api";

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

          const response = await api("/sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("Email ou senha incorretos!");
          }

          const data = await response.json();

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            avatar: data.user.avatar,
            created_at: data.user.created_at,
            updated_at: data.user.updated_at,
            token: data.token,
          };
        } catch (error) {
          console.error("Erro no authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // * ✅ Este callback é chamado toda vez que o JWT é criado ou atualizado
    // * ✅ Na primeira vez (após login), o "user" estará preenchido
    // * ✅ Nas próximas vezes, o "user" será undefined, e só o token será processado
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    // * ✅ Este callback é chamado toda vez que alguém chama "getSession()" ou "useSession()"
    // * ✅ Ele permite adicionar ao objeto "session" dados que vieram do JWT (token)
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
