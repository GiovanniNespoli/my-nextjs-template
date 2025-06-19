"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "../interface/IUser";
import ModalStyled from "@/components/modal-styled";
import { DeleteUsers } from "@/app/core/services/user/services";
import { useCallback } from "react";
import { toast } from "sonner";

export const tableColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Cargo",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const HandleDeleteUser = useCallback(async () => {
        try {
          await DeleteUsers(user.id);
          toast.success("Usuário deletado com sucesso!");
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Erro desconhecido");
          }
        }
      }, []);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <ModalStyled
                modalTitle="Deletar usuário"
                triggerElement={
                  <>
                    <p className="cursor-default gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors">
                      Deletar
                    </p>
                  </>
                }
                modalContentElement={
                  <>
                    <strong className="text-zinc-800">
                      Tem certeza que deseja excluir este usuário?
                    </strong>
                    <p className="text-zinc-800">
                      Essa ação é irreversível e removerá permanentemente o
                      usuário do sistema.
                    </p>
                  </>
                }
                action={() => HandleDeleteUser()}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
