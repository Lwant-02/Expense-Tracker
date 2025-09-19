"use client";

import { useState, useEffect } from "react";
import { useExpenseStore } from "@/store/store";
import { ExpenseWithCategory } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseDataTableProps {
  onEditExpense?: (expense: ExpenseWithCategory) => void;
}

export function ExpenseDataTable({ onEditExpense }: ExpenseDataTableProps) {
  const { getFilteredExpenses, deleteExpense, categories } = useExpenseStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleEditExpense = (expense: ExpenseWithCategory) => {
    if (onEditExpense) {
      onEditExpense(expense);
    }
  };

  const handleDeleteExpense = (expenseId: string) => {
    deleteExpense(expenseId);
  };

  // Get filtered expenses only after hydration
  const expenses = isHydrated ? getFilteredExpenses() : [];

  const columns = createColumns(handleEditExpense, handleDeleteExpense);

  if (!isHydrated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No expenses yet. Add your first expense to get started!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} data={expenses} />
      </CardContent>
    </Card>
  );
}
