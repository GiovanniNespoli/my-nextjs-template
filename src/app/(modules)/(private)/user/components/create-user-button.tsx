"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateUserButton() {
  const { push } = useRouter();

  return <Button onClick={() => push("/user/createUser")}>Create user</Button>;
}
