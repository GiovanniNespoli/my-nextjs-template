import { Metadata } from "next";
import { IUser } from "./interface/IUser";
import { useGetUsers } from "@/app/core/services/user/services";
import { auth } from "@/app/api/auth/auth";
import { SignOut } from "./components/signout-button";

export const metadata: Metadata = {
  title: "Lista",
};

async function getUsers(): Promise<IUser[]> {
  return await useGetUsers();
}

export default async function UserList() {
  // const users = await getUsers();
  const session = await auth();

  return (
    <main className="m-4 h-3/4">
      <pre className="text-black">{JSON.stringify(session, null, 2)}</pre>
      {/* <TableWithFilter users={users} title={"Users List"} /> */}
      <SignOut />
    </main>
  );
}
