"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useExpenseStore } from "@/store/store";
import { ExpenseWithCategory } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";

interface ExpenseListProps {
  onEditExpense?: (expense: ExpenseWithCategory) => void;
}

export function ExpenseList({ onEditExpense }: ExpenseListProps) {
  const {
    getFilteredExpenses,
    categories,
    filters,
    setFilters,
    deleteExpense,
  } = useExpenseStore();

  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const expenses = isHydrated ? getFilteredExpenses() : [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilters({ searchTerm: value });
  };

  const handleCategoryFilter = (categoryId: string) => {
    setFilters({
      categoryId: categoryId === "all" ? undefined : categoryId,
    });
  };

  const handleSortChange = (sortBy: string) => {
    const [field, order] = sortBy.split("-");
    setFilters({
      sortBy: field as any,
      sortOrder: order as "asc" | "desc",
    });
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(expenseId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <div className="space-y-4">
          {/* Date Range Picker */}
          <DateRangePicker />

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={filters.categoryId || "all"}
              onValueChange={handleCategoryFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="amount-desc">
                  Amount (High to Low)
                </SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                <SelectItem value="description-asc">
                  Description (A-Z)
                </SelectItem>
                <SelectItem value="description-desc">
                  Description (Z-A)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {filters.searchTerm || filters.categoryId
                ? "No expenses match your filters"
                : "No expenses yet. Add your first expense to get started!"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 w-fit"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: expense.category.color }}
                        />
                        {expense.category.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(expense.date, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onEditExpense && (
                            <DropdownMenuItem
                              onClick={() => onEditExpense(expense)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
