import { DataTable } from "@/components/tanStack-table/data-table";
import { Metadata } from "next";
import { tableColumns } from "./components/tableColumns";
import { IUser } from "./interface/IUser";
import CreateUserButton from "./components/create-user-button";
import { GET } from "@/app/core/services/user/hooks";

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
      <div className="w-full h-10 flex gap-4">
        <h1 className="text-zinc-950 text-xl">Users list</h1>
        <CreateUserButton />
      </div>
      <div className="py-4 w-full h-full overflow-hidden">
        <DataTable columns={tableColumns} data={users} />
      </div>
    </main>
  );
}
