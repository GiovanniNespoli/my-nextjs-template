import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./components/submit-button";

export default function CreateUser() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <form
        className="w-1/2 h-4/5 bg-zinc-100 border-1  border-zinc-300 rounded-[8px] shadow-xl animate-fadeInUp"
        action=""
      >
        <h2 className="font-semibold text-2xl text-black m-6">
          Cadastrar usuário
        </h2>
        <div className="flex flex-wrap justify-between m-6 gap-10">
          <div className="w-[250px] h-10">
            <Label className="text-black" htmlFor="picture">
              Name
            </Label>
            <Input type="text" className="rounded-[8px] border-zinc-300 shadow-md text-black" />
          </div>
          <div className="w-[250px] h-10">
            <Label className="text-black" htmlFor="picture">
              Email
            </Label>
            <Input type="email" className="rounded-[8px] border-zinc-300 shadow-md text-black" />
          </div>
          <div className="w-[250px] h-10">
            <Label className="text-black" htmlFor="picture">
              phone
            </Label>
            <Input type="tel" className="rounded-[8px] border-zinc-300 shadow-md text-black" />
          </div>
          <div className="w-[250px] h-10"></div>
        </div>
        <SubmitButton />
      </form>
    </main>
  );
}
