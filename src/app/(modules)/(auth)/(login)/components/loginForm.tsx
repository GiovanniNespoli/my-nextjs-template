"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const { push } = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signInUser = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(signInUser);

    if (!signInUser?.error) push("/user");
  }

  return (
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
  );
}
