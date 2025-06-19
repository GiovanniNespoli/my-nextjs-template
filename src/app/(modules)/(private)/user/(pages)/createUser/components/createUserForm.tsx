"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserRoleEnum } from "../../../interface/IUser";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateUserFormData,
  createUserFormResolver,
} from "./createUserForm.zod";
import { CreateUsers } from "@/app/core/services/user/services";
import { toast } from "sonner";
import { SelectStyled } from "@/components/select-styled";

export default function CreateUserForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: createUserFormResolver,
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = async ({
    email,
    name,
    role,
  }) => {
    try {
      setIsLoading(true);
      await CreateUsers({
        name,
        email,
        password: "user@123",
        role,
      });

      toast.success("Cadastro realizado com sucesso!");
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
      className="w-1/3 h-4/5 bg-zinc-100 border-1 border-zinc-300 rounded-[8px] shadow-xl animate-fadeInUp flex flex-col items-center gap-4 text-zinc-800 p-6"
    >
      <h1 className="font-bold text-2xl">Criar novo usuário</h1>
      <div className="w-full">
        <Label>Nome</Label>
        <Input
          disabled={isLoading}
          type="text"
          placeholder="John Doe"
          {...register("name")}
        />
        {
          <p className="w-full h-5 text-xs text-red-600">
            {errors.name?.message}
          </p>
        }
      </div>
      <div className="w-full">
        <Label>Email</Label>
        <Input
          disabled={isLoading}
          type="email"
          placeholder="exemplo@gmail.com"
          {...register("email")}
        />
        {
          <p className="w-full h-5 text-xs text-red-600">
            {errors.email?.message}
          </p>
        }
      </div>
      <div className="w-full">
        <Label>Cargo</Label>
        <SelectStyled
          control={control}
          name="role"
          disabled={isLoading}
          triggerPlaceholder="Selecione um cargo"
          options={[
            { label: "Administrador", value: UserRoleEnum.ADMIN },
            { label: "Operador", value: UserRoleEnum.OPERATOR },
          ]}
        />
        {
          <p className="w-full h-5 text-xs text-red-600">
            {errors.role?.message}
          </p>
        }
      </div>
      <Button type="submit" disabled={isLoading} className="rounded-[12px]">
        Create user
      </Button>
    </form>
  );
}
