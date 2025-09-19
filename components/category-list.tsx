"use client";

import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useExpenseStore } from "@/store/store";
import { Category } from "@/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryListProps {
  onEditCategory?: (category: Category) => void;
}

export function CategoryList({ onEditCategory }: CategoryListProps) {
  const { categories, deleteCategory, expenses } = useExpenseStore();

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
    const expenseCount = getCategoryExpenseCount(categoryId);

    if (expenseCount > 0) {
      if (
        !confirm(
          `This category has ${expenseCount} expense(s). Deleting it will also delete all associated expenses. Are you sure?`
        )
      ) {
        return;
      }
    } else {
      if (!confirm("Are you sure you want to delete this category?")) {
        return;
      }
    }

    deleteCategory(categoryId);
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
                              ${total.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEditCategory && (
                          <DropdownMenuItem
                            onClick={() => onEditCategory(category)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
