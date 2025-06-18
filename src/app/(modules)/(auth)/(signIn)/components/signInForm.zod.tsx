import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// * ✅ Criando o schema de validação com Zod
const signInFormSchema = z.object({
  email: z
    .string()
    .nonempty("O campo email é obrigatório")
    .email("Dever ser um email válido"),
  password: z
    .string()
    .nonempty("A senha é obrigatária")
    .min(6, "A senha deve ter 8 ou mais caracteres"),
});

// * ✅ Gerando o tipo TypeScript automaticamente a partir do schema
// * Isso evita ter que criar o tipo manualmente
export type SignInFormData = z.infer<typeof signInFormSchema>;

// * ✅ Criando o resolver que conecta o Zod com o React Hook Form
// * Ele permite o formulário rodar as validações definidas no schema
export const signInFormResolver = zodResolver(signInFormSchema);
