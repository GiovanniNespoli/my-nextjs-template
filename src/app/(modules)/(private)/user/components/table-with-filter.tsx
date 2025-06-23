"use client";

import { DataTable } from "@/components/tanStack-table/data-table";
import { IUser } from "../interface/IUser";
import FilterUserTable from "./filter-user-table";
import { tableColumns } from "./table-columns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TableWithFilterProps {
  users: IUser[];
  title: string;
}

export default function TableWithFilter({
  title,
  users,
}: TableWithFilterProps) {
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  return (
    <>
      <div className="w-full h-10 flex gap-4">
        <h1 className="text-zinc-950 text-xl">{title}</h1>
        <Button onClick={() => push("/user/createUser")}>Create user</Button>
        <div>
          <FilterUserTable
            filteredUser={(data) => {
              if (!data) return setUsersList(users);

              setUsersList([data]);
            }}
          />
        </div>
      </div>
      <div className="py-4 w-full h-full overflow-hidden">
        <DataTable columns={tableColumns} data={usersList} />
      </div>
    </>
  );
}
