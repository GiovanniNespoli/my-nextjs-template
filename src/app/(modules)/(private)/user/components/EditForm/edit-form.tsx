import { Input } from "@/components/ui/input";
import { IUser } from "../../interface/IUser";
import {
  CreateUserFormData,
  createUserFormResolver,
} from "../../(pages)/createUser/components/createUserForm.zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UpdateUser } from "@/app/core/services/user/services";

interface EditFormProps {
  user: IUser;
  closeModal: () => void;
}

export default function EditForm({ user, closeModal }: EditFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: createUserFormResolver,
    defaultValues: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = async ({
    email,
    name,
  }) => {
    try {
      setIsLoading(true);

      await UpdateUser(user.id, { email, name });

      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro desconhecido");
      }
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col gap-3"
    >
      <div className="w-full">
        <Input
          disabled={isLoading}
          type="text"
          placeholder={user.name}
          {...register("name")}
          className="placeholder:text-zinc-700 text-zinc-700"
        />
        {
          <p className="w-full h-5 text-xs text-red-600">
            {errors.name?.message}
          </p>
        }
      </div>
      <div className="w-full">
        <Input
          disabled={isLoading}
          type="text"
          placeholder={user.email}
          {...register("email")}
          className="placeholder:text-zinc-700 text-zinc-700"
        />
        {
          <p className="w-full h-5 text-xs text-red-600">
            {errors.name?.message}
          </p>
        }
      </div>
      {/* <div className="w-full">
        <SelectStyled
          control={control}
          name="role"
          disabled={isLoading}
          triggerPlaceholder={user.role}
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
      </div> */}
      <Button type="submit" disabled={isLoading} className="rounded-[12px]">
        Atualizar usuário
      </Button>
    </form>
  );
}
