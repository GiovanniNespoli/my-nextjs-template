"use client";

import { useGetUsersById } from "@/app/core/services/user/services";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { IUser } from "../interface/IUser";

interface IFilterUserTableProps {
  filteredUser(userId?: IUser): void;
}

export default function FilterUserTable({
  filteredUser,
}: IFilterUserTableProps) {
  const handleFilter = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const user = await useGetUsersById(event.target.value);
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
