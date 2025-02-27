import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import LoginButton from "./components/loginButton";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <div className="w-1/3 h-3/4 bg-zinc-100 border-1  border-zinc-300 rounded-[8px] shadow-xl flex justify-center items-center">
        <form className="h-4/6 flex flex-col justify-between">
          <p className="text-zinc-950 text-4xl font-(famlily-name: --sans)">
            <b>Bem vindo</b> - Login
          </p>
          <Input
            className="text-zinc-950 w-full rounded-[4px]"
            type="email"
            placeholder="Email"
          />
          <Input
            className="text-zinc-950 w-full rounded-[4px]"
            type="password"
            placeholder="Senha"
          />
          <div className="flex flex-col items-center gap-3">
            <p className="text-zinc-950 underline cursor-pointer">
              Esqueci a senha
            </p>
            <p className="text-zinc-950">
              Não possui uma conta?{" "}
              <b className="underline cursor-pointer">cadastrar</b>
            </p>
          </div>
          <LoginButton navigation={"/list"} />
        </form>
      </div>
    </div>
  );
}
