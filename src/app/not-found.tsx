import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-2 text-zinc-800">
      <h2>Página não encontrada ( not found )</h2>
      <p>Could not find requested resource</p>
      <Link href={"/user/profile"} className="bg-blue-300 py-2 px-4">
        Voltar
      </Link>
    </div>
  );
}
