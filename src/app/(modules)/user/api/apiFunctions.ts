"use server";

import { api } from "@/app/api/api";
import { UsersApiRoutes } from "./routes";
import { revalidateTag } from "next/cache";
import { IUserCreateData } from "../interface/IUser";

export async function GET() {
  const response = await fetch(`${api}${UsersApiRoutes.USERS}`, {
    next: { tags: ["collection"] },
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar os dados");
  }

  const data = await response.json();
  return data;
}

export async function DELETE(userId: string) {
  const response = await fetch(`${api}${UsersApiRoutes.USERS}/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar o usuário");
  }

  revalidateTag("collection");
}

export async function CREATE(data: IUserCreateData) {
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
