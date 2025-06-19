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
import { ReactElement } from "react";

interface ModalStyledProps {
  modalTitle: string;
  triggerElement: ReactElement;
  modalContentElement: ReactElement;
  cancelButton?: ReactElement;
  continueButton?: ReactElement;
    action: () => void;
}

export default function ModalStyled({
  triggerElement,
  modalContentElement,
  modalTitle,
  cancelButton,
  continueButton,
  action,
}: ModalStyledProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{triggerElement}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-800">
            {modalTitle}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>{modalContentElement}</div>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-zinc-800">
            {cancelButton ? cancelButton : <p>Cancelar</p>}
          </AlertDialogCancel>
          <AlertDialogAction onClick={action}>
            {continueButton ? continueButton : <p>Continuar</p>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
