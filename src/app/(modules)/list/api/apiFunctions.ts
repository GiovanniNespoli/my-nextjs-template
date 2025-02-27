import { api } from "@/app/api/api";
import { UsersApiRoutes } from "./routes";

export async function GET() {
  const response = await fetch(`${api}${UsersApiRoutes}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar os dados");
  }

  const data = await response.json();
  return data;
}
