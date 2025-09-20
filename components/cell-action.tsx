import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomDialog } from "./custom-dialog";
import { useState } from "react";

interface ColumnActionsProps<T extends { id: string }> {
  data: T;
  onEdit: (data: T) => void;
  onDelete: (id: string) => void;
}
export default function CellAction<T extends { id: string }>({
  data,
  onEdit,
  onDelete,
}: ColumnActionsProps<T>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(data)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Delete Expense"
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this expense?
        </p>
        <div className="grid grid-cols-2 gap-4 justify-center items-center mt-4">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsDeleteDialogOpen(false)}
            disabled={false}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onDelete(data.id);
              setIsDeleteDialogOpen(false);
            }}
            className="cursor-pointer"
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </CustomDialog>
    </>
  );
}
