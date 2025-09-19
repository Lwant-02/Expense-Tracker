"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { ExpenseWithCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ExpenseActions from "./cell-action";

export const createColumns = (
  onEdit: (expense: ExpenseWithCategory) => void,
  onDelete: (expenseId: string) => void
): ColumnDef<ExpenseWithCategory>[] => [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const expense = row.original;
      return (
        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: expense.category?.color || "#gray" }}
          />
          {expense.category?.name || "Unknown"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      const expenseDate = date instanceof Date ? date : new Date(date);
      return <div>{format(expenseDate, "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-left font-medium">${amount.toFixed(2)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const expense = row.original;
      return (
        <ExpenseActions expense={expense} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];
