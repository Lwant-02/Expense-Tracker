import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const CustomDialog = ({
  isOpen,
  onClose,
  title,
  children,
}: CustomDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
