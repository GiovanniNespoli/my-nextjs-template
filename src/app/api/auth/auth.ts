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

          console.log("credentials", email, password);

          const response = await fetch(`${api}/api/sessions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          console.log("data", data);
          return data;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
});
