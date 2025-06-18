"use client";

import { useSession } from "next-auth/react";

export default function Header() {
  const { data } = useSession();

  return (
    <div className="w-full h-full bg-zinc-100 shadow-md flex items-center justify-between">
      <h1 className="text-3xl font-bold text-zinc-950 ml-4">Template</h1>
      <div className="w-1/6 flex items-end justify-end flex-col mr-4 gap-3">
        <p className="text-zinc-950 text-right text-xl font-semibold">
          {data?.user.name}
        </p>
        <p className="text-zinc-700 text-right text-xs">{data?.user.role}</p>
      </div>
    </div>
  );
}
