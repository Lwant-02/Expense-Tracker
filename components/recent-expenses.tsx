"use client";

import { format } from "date-fns";
import { ExpenseWithCategory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentExpensesProps {
  expenses: ExpenseWithCategory[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No expenses yet. Add your first expense to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="max-h-72 overflow-y-auto overflow-scroll">
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: expense.category.color }}
                >
                  {expense.category.icon || expense.category.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {expense.category.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(expense.date, "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">
                  ${expense.amount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
