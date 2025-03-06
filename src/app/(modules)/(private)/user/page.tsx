import { Metadata } from "next";
import { IUser } from "./interface/IUser";
import { GET } from "@/app/core/services/user/hooks";
import TableWithFilter from "./components/table-with-filter";

export const metadata: Metadata = {
  title: "Lista",
};

async function getUsers(): Promise<IUser[]> {
  return await GET();
}

export default async function UserList() {
  const users = await getUsers();

  return (
    <main className="m-4 h-3/4">
      <TableWithFilter users={users} title={"Users List"} />
    </main>
  );
}
