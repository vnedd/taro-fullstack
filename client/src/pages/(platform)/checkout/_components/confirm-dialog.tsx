import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  children?: React.ReactNode;
}

const ConfirmDialog = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading,
  children,
}: Props) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent className="max-w-[90vw] md:max-w-[600px] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative">
          {loading ? (
            <div className="w-full h-full p-10 flex items-center justify-center">
              <Loader className="animate-spin w-4 h-4" />
            </div>
          ) : (
            <div> {children}</div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            Edit Entered Address
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Use Verified Address
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
