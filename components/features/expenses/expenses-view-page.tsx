"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ExpenseDataTable } from "./expense-data-table";
import { ExpenseFilters } from "./expense-filters";
import { ExpenseForm } from "@/components/expense-form";
import { Button } from "@/components/ui/button";

import { ExpenseWithCategory } from "@/types";
import { CustomDialog } from "@/components/custom-dialog";

export default function ExpensesViewPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] =
    useState<ExpenseWithCategory | null>(null);

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingExpense(null);
  };

  const handleEditExpense = (expense: ExpenseWithCategory) => {
    setEditingExpense(expense);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            View and manage all your expenses
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <ExpenseFilters />
      <ExpenseDataTable onEditExpense={handleEditExpense} />

      {/* Add Expense Dialog */}
      <CustomDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Add New Expense"
      >
        <ExpenseForm
          onSuccess={handleAddSuccess}
          onCancel={() => setIsAddDialogOpen(false)}
        />
      </CustomDialog>

      {/* Edit Expense Dialog */}
      <CustomDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Edit Expense"
      >
        {editingExpense && (
          <ExpenseForm
            expense={editingExpense}
            onSuccess={handleEditSuccess}
            onCancel={() => {
              setIsEditDialogOpen(false);
              setEditingExpense(null);
            }}
          />
        )}
      </CustomDialog>
    </div>
  );
}
