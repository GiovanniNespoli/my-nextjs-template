"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpFormData, signUpFormResolver } from "./signUpForm.zod";
import { useState } from "react";
import { createUsers } from "@/app/core/services/user/services";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: signUpFormResolver,
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async ({
    name,
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const newUser = await createUsers({
        name,
        email,
        password,
        role: "OPERATOR",
      });

      toast.success("Cadastro realizado com sucesso!");

      if (newUser) {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        router.push("/user");
      }
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
      className="h-full w-5/6 flex py-8 flex-col justify-between "
    >
      <div className="flex justify-center">
        <p className="text-zinc-950 text-4xl font-(famlily-name: --sans)">
          <b>Cadastro</b>
        </p>
      </div>
      <div>
        <Input
          className="text-zinc-950 w-full rounded-[4px]"
          type="text"
          placeholder="Nome completo"
          {...register("name")}
          disabled={isLoading}
        />
        <div className="h-4 w-full">
          {errors.name && (
            <span className="text-red-600 text-xs">{errors.name.message}</span>
          )}
        </div>
      </div>

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
      <div>
        <Input
          className="text-zinc-950 w-full rounded-[4px]"
          type="password"
          placeholder="Confirme a senha"
          {...register("password_confirmation")}
          disabled={isLoading}
        />
        <div className="h-4 w-full">
          {errors.password_confirmation && (
            <span className="text-red-600 text-xs">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-zinc-950">
          Já possui uma conta?
          <b
            onClick={() => router.push("/")}
            className="underline cursor-pointer hover:text-zinc-600"
          >
            Login
          </b>
        </p>
      </div>
      <Button disabled={isLoading} type="submit" className="bg-blue-600">
        Cadastrar
      </Button>
    </form>
  );
}
