import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista",
};

export default function List() {
  return (
    <div className="w-dvw h-dv">
      <div>
        <Header userName="Giovanni Nespoli" />
      </div>
      <main>
        <h1>Lista de usuários</h1>
        <div></div>
      </main>
    </div>
  );
}
