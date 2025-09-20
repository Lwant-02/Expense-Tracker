"use client";

import { DEMO_CATEGORIES, DEMO_EXPENSES } from "@/constants/demo-data";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CellAction from "@/components/cell-action";
import { toast } from "sonner";

interface CategoryListProps {
  onEditCategory?: (category: Category) => void;
}

export function CategoryList({ onEditCategory }: CategoryListProps) {
  const categories = DEMO_CATEGORIES;
  const expenses = DEMO_EXPENSES;

  const getCategoryExpenseCount = (categoryId: string) => {
    return expenses.filter((expense) => expense.categoryId === categoryId)
      .length;
  };

  const getCategoryTotal = (categoryId: string) => {
    return expenses
      .filter((expense) => expense.categoryId === categoryId)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // const expenseCount = getCategoryExpenseCount(categoryId);
    console.log(categoryId);

    toast.success("Success!", {
      description: "Your Category has been deleted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No categories yet. Add your first category to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const expenseCount = getCategoryExpenseCount(category.id);
              const total = getCategoryTotal(category.id);

              return (
                <div
                  key={category.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon || category.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {expenseCount} expense
                            {expenseCount !== 1 ? "s" : ""}
                          </Badge>
                          {total > 0 && (
                            <span className="text-sm text-muted-foreground">
                              THB {total.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <CellAction
                      data={category}
                      onEdit={() => onEditCategory?.(category)}
                      onDelete={handleDeleteCategory}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
