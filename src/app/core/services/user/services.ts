"use server";

import { UsersApiRoutes } from "@/app/core/services/user/routes";
import {
  IUser,
  IUserCreateData,
} from "@/app/(modules)/(private)/user/interface/IUser";
import { api } from "@/app/api/api";
import { revalidateTag } from "next/cache";

// * Hook server-side para buscar a lista de usuários
export async function GetUsers() {
  // * Faz a requisição GET para a rota de usuários da API
  // * Inclui a opção `next: { tags: ["collection"] }` para o Next.js conseguir revalidar o cache por tag depois
  const response = await api(UsersApiRoutes.USERS, {
    next: { tags: ["collection"] },
  });

  // * Verifica se a resposta da API foi bem-sucedida
  // * Se não for, lança um erro que pode ser tratado pela interface ou pelo servidor
  if (!response.ok) {
    throw new Error("Erro ao buscar os dados");
  }

  // * Converte a resposta da API de JSON para objeto JavaScript
  const data = await response.json();

  // * Retorna os dados para quem chamou essa função (ex: uma página ou outro serviço)
  return data;
}

export async function GetUsersById(
  userId?: string
): Promise<IUser | undefined> {
  if (userId) {
    const response = await api(`${UsersApiRoutes.USERS}/${userId}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar os dados");
    }

    const data = (await response.json()) as IUser;
    return data;
  } else {
    return undefined;
  }
}

export async function DeleteUsers(userId: string) {
  const response = await api(`${UsersApiRoutes.USERS}/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o usuário");
  }

  revalidateTag("collection");
}

export async function CreateUsers(data: IUserCreateData) {
  const response = await api(UsersApiRoutes.USERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `Erro ao criar usuário. Status: ${response.status}`;

    throw new Error(errorMessage);
  }

  revalidateTag("collection");

  return await response.json();
}
