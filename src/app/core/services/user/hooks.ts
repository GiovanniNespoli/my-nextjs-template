"use server";

import { UsersApiRoutes } from "@/app/core/services/user/routes";
import {
  IUser,
  IUserCreateData,
} from "@/app/(modules)/(private)/user/interface/IUser";
import { api } from "@/app/api/api";
import { revalidateTag } from "next/cache";

export async function useGetUsers() {
  const response = await fetch(`${api}${UsersApiRoutes.USERS}`, {
    next: { tags: ["collection"] },
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar os dados");
  }

  const data = await response.json();
  return data;
}

export async function useGetUsersById(
  userId?: string
): Promise<IUser | undefined> {
  if (userId) {
    const response = await fetch(`${api}${UsersApiRoutes.USERS}/${userId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados");
    }

    const data = (await response.json()) as IUser;
    return data;
  } else {
    return undefined;
  }
}

export async function useDeleteUsers(userId: string) {
  const response = await fetch(`${api}${UsersApiRoutes.USERS}/${userId}`, {
    method: "useDeleteUsers",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o usuário");
  }

  revalidateTag("collection");
}

export async function useCreateUsers(data: IUserCreateData) {
  const response = await fetch(`${api}${UsersApiRoutes.USERS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o usuário");
  }

  revalidateTag("collection");
}
