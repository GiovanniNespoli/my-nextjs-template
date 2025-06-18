"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormData, signInFormResolver } from "./signInForm.zod";
import { toast } from "sonner";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: signInFormResolver,
  });

  const onSubmit: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response.error) {
        return toast.error("Email ou senha incorretos!");
      }

      return push("/user");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro desconhecido");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-4/6 w-5/6 flex flex-col justify-between"
    >
      <p className="text-zinc-950 text-4xl font-(famlily-name: --sans)">
        <b>Bem vindo</b> - Login
      </p>
      <div>
        <Input
          className="text-zinc-950 w-full rounded-[4px]"
          type="text"
          placeholder="Email"
          {...register("email")}
          disabled={isLoading}
        />
        <div className="h-4 w-full">
          {errors.email && (
            <span className="text-red-600 text-xs">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div>
        <Input
          className="text-zinc-950 w-full rounded-[4px]"
          type="password"
          placeholder="Senha"
          {...register("password")}
          disabled={isLoading}
        />
        <div className="h-4 w-full">
          {errors.password && (
            <span className="text-red-600 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-zinc-950 underline cursor-pointer">
          Esqueci a senha
        </p>
        <p className="text-zinc-950">
          Não possui uma conta?
          <b
            onClick={() => push("/signUp")}
            className="underline cursor-pointer hover:text-zinc-600"
          >
            Cadastrar
          </b>
        </p>
      </div>

      <Button type="submit" className="bg-blue-600" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Login"}
      </Button>
    </form>
  );
}
