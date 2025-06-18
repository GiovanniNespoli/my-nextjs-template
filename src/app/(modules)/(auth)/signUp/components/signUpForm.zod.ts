import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// * ✅ Criando o schema de validação com Zod
const signUpFormSchema = z
  .object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    email: z.string().nonempty("O campo email é obrigatório"),
    password: z
      .string()
      .nonempty("A senha é obrigatária")
      .min(6, "A senha deve ter 8 ou mais caracteres"),
    password_confirmation: z
      .string()
      .nonempty("A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não coincidem",
    path: ["password_confirmation"],
  });

// * ✅ Gerando o tipo TypeScript automaticamente a partir do schema
// * Isso evita ter que criar o tipo manualmente
export type SignUpFormData = z.infer<typeof signUpFormSchema>;

// * ✅ Criando o resolver que conecta o Zod com o React Hook Form
// * Ele permite o formulário rodar as validações definidas no schema
export const signUpFormResolver = zodResolver(signUpFormSchema);
