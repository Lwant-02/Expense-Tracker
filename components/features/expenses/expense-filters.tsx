"use client";

import { useState } from "react";
import { useExpenseStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";

export function ExpenseFilters() {
  const { categories, filters, setFilters } = useExpenseStore();
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");

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

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      searchTerm: "",
      categoryId: undefined,
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.categoryId;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={filters.categoryId || "all"}
              onValueChange={handleCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
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
                      {category.name}
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                <SelectItem value="description-asc">Description (A-Z)</SelectItem>
                <SelectItem value="description-desc">Description (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="h-9"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
