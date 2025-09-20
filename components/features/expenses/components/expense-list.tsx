"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";

import { useAppStore } from "@/store/store";
import { getFilteredExpenses } from "@/lib/expense-utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/date-range-picker";
import CellAction from "@/components/cell-action";
import { Spinner } from "@/components/spinner";
import { CategoryFilter } from "./category-filter";
import { Sort } from "./sort";
import { Pagination } from "@/components/pagination";
import { DEMO_EXPENSES } from "@/constants/demo-data";
import { toast } from "sonner";

interface ExpenseListProps {
  onEditExpense?: (expense: ExpenseWithCategory) => void;
}

export function ExpenseList({ onEditExpense }: ExpenseListProps) {
  const { filters, setFilters } = useAppStore();

  // URL state management
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: filters.searchTerm || "",
  });
  const [categoryFilter, setCategoryFilter] = useQueryState("category", {
    defaultValue: filters.categoryId || "",
  });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: filters.sortBy || "date",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: filters.sortOrder || "desc",
  });
  const [currentPage, setCurrentPage] = useQueryState("page", {
    ...parseAsInteger,
    defaultValue: 1,
  });
  const [pageSize, setPageSize] = useQueryState("pageSize", {
    ...parseAsInteger,
    defaultValue: 10,
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync URL params with store filters
  useEffect(() => {
    if (isHydrated) {
      setFilters({
        searchTerm: searchQuery,
        categoryId: categoryFilter || undefined,
        sortBy: sortBy as "date" | "amount" | "description" | "category",
        sortOrder: sortOrder as "asc" | "desc",
      });
    }
  }, [isHydrated, searchQuery, categoryFilter, sortBy, sortOrder, setFilters]);

  const allExpenses = isHydrated ? getFilteredExpenses(filters) : [];

  // Pagination calculations
  const totalPages = Math.ceil(allExpenses.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const expenses = allExpenses.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: string) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategoryFilter(categoryId || "");
    setCurrentPage(1);
  };

  const handleSortChange = (field: string) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handleDeleteExpense = (expenseId: string) => {
    DEMO_EXPENSES.filter((expense) => expense.id !== expenseId);
    toast.success("Success!", {
      description: "Your Expense has been deleted successfully.",
    });
  };

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-72">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <div className="space-y-4 mt-3">
          {/* Date Range Picker */}

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <DateRangePicker />

            {/* Category Filter */}
            <CategoryFilter
              onCategoryChange={handleCategoryChange}
              selectedCategory={categoryFilter}
            />

            {/* Sort */}
            <Sort
              onSortChange={handleSortChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
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
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Action</TableHead>
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
                        THB {expense.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <CellAction
                          data={expense}
                          onEdit={() => onEditExpense?.(expense)}
                          onDelete={handleDeleteExpense}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {allExpenses.length > 0 && (
              <Pagination
                data={allExpenses}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handlePageSizeChange={handlePageSizeChange}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
