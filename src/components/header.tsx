import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <div className="w-full h-24 bg-zinc-100 shadow-md flex items-center justify-between">
      <h1 className="text-3xl font-bold text-zinc-950 ml-4">Template</h1>
      <div className="w-1/6 flex items-center justify-end mr-4 gap-3">
        <p className="text-zinc-950 text-right text-sm">{userName}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
