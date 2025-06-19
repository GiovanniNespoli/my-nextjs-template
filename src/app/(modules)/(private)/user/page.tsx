import { Metadata } from "next";
import { SignOut } from "./components/signout-button";
import { GetUsers } from "@/app/core/services/user/services";
import TableWithFilter from "./components/table-with-filter";

export const metadata: Metadata = {
  title: "Lista",
};

export default async function UserList() {
  const users = await GetUsers();

  return (
    <main className="m-4 h-3/4">
      <TableWithFilter users={users} title={"Users List"} />
      <SignOut />
    </main>
  );
}
