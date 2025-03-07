"use client";

import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

export default function Login() {

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // evita refresh da página

    // Cria um objeto FormData a partir do formulário
    const formData = new FormData(e.currentTarget);

    // Pega os valores pelo "name" dos inputs
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Form data:", { email, password });

    // Faz o signIn com NextAuth
    const test = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("login return", test);
  }

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="w-1/3 h-3/4 bg-zinc-100 border-1  border-zinc-300 rounded-[8px] shadow-xl flex justify-center items-center animate-fadeInUp">
        <form
          onSubmit={handleSubmit}
          className="h-4/6 flex flex-col justify-between "
        >
          <p className="text-zinc-950 text-4xl font-(famlily-name: --sans)">
            <b>Bem vindo</b> - Login
          </p>
          <Input
            className="text-zinc-950 w-full rounded-[4px]"
            name="email"
            type="email"
            placeholder="Email"
          />
          <Input
            className="text-zinc-950 w-full rounded-[4px]"
            name="password"
            type="password"
            placeholder="Senha"
          />
          <div className="flex flex-col items-center gap-3">
            <p className="text-zinc-950 underline cursor-pointer">
              Esqueci a senha
            </p>
            <p className="text-zinc-950">
              Não possui uma conta?{" "}
              <b className="underline cursor-pointer">cadastrar</b>
            </p>
          </div>
          {/* <LoginButton navigation={"/user"} /> */}
          <Button type="submit" className="bg-blue-600">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
