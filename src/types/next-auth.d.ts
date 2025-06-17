import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      role: string;
      created_at: Date;
      updated_at: Date;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}
