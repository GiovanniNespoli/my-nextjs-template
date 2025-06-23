/* eslint-disable @typescript-eslint/no-unused-vars */
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
import EditForm from "./EditForm/edit-form";

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
          <DropdownMenuContent className="flex flex-col" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <ModalStyled
                modalTitle="Deletar usuário"
                triggerElement={
                  <div className="w-full text-left px-2 py-1.5 hover:bg-slate-100">
                    Deletar
                  </div>
                }
                modalContentElement={(_close) => (
                  <>
                    <strong className="text-zinc-800">
                      Tem certeza que deseja excluir este usuário?
                    </strong>
                    <p className="text-zinc-800">
                      Essa ação é irreversível e removerá permanentemente o
                      usuário do sistema.
                    </p>
                  </>
                )}
                action={() => HandleDeleteUser()}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ModalStyled
                hasModalButton={false}
                modalTitle="Editar usuário"
                triggerElement={
                  <div className="w-full text-left px-2 py-1.5 hover:bg-slate-100">
                    Editar
                  </div>
                }
                modalContentElement={(close) => (
                  <EditForm user={row.original} closeModal={close} />
                )}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
