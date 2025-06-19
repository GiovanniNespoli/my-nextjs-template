"use client";

import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { IUser } from "../interface/IUser";
import { GetUsersById } from "@/app/core/services/user/services";

interface IFilterUserTableProps {
  filteredUser(userId?: IUser): void;
}

export default function FilterUserTable({
  filteredUser,
}: IFilterUserTableProps) {
  const handleFilter = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const user = await GetUsersById(event.target.value);
      filteredUser(user);
    },
    [filteredUser]
  );

  return (
    <Input
      type="text"
      className="bg-white rounded-[8px] border-zinc-300 shadow-md text-black"
      placeholder="Set user id"
      onChange={handleFilter}
    />
  );
}
