import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserRoleEnum } from "../../../interface/IUser";

const createUserFormSchema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .nonempty("O campo email é obrigatório")
    .email("Dever ser um email válido"),
  role: z.nativeEnum(UserRoleEnum, {
    errorMap: () => ({ message: "Selecione uma função de usuário válida" }),
  }),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export const createUserFormResolver = zodResolver(createUserFormSchema);
