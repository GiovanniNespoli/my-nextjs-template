import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactElement, ReactNode, useState } from "react";

interface ModalStyledProps {
  modalTitle: string;
  triggerElement: ReactElement;
  modalContentElement: (close: () => void) => ReactNode;
  cancelButton?: ReactElement;
  continueButton?: ReactElement;
  action?: () => void;
  hasModalButton?: boolean;
}

export default function ModalStyled({
  triggerElement,
  modalContentElement,
  modalTitle,
  cancelButton,
  continueButton,
  hasModalButton = true,
  action,
}: ModalStyledProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{triggerElement}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-800">
            {modalTitle}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>{modalContentElement(handleClose)}</div>
        {hasModalButton && (
          <AlertDialogFooter>
            <AlertDialogCancel className="text-zinc-800">
              {cancelButton ? cancelButton : <p>Cancelar</p>}
            </AlertDialogCancel>
            <AlertDialogAction onClick={action}>
              {continueButton ? continueButton : <p>Continuar</p>}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
