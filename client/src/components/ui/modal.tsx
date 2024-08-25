import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn("sm:max-w-[425px] max-w-[90%] rounded-md", className)}
      >
        {title && description && (
          <DialogHeader className="text-left">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>
        )}
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
