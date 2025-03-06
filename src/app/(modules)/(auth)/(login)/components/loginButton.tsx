"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
  navigation: string;
}

export default function LoginButton({ navigation }: LoginButtonProps) {
  const { push } = useRouter();

  return (
    <Button
      type="button"
      className="bg-blue-600"
      onClick={() => push(navigation)}
    >
      Login
    </Button>
  );
}
