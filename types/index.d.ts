export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseWithCategory extends Expense {
  category: Category;
}

export interface ExpenseFilters {
  categoryId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
  sortBy?: "date" | "amount" | "description" | "category";
  sortOrder?: "asc" | "desc";
}

export interface ExpenseSummary {
  totalExpenses: number;
  monthlyTotal: number;
  weeklyTotal: number;
  categoryBreakdown: Array<{
    categoryId: string;
    categoryName: string;
    total: number;
    percentage: number;
    color: string;
  }>;
  recentExpenses: ExpenseWithCategory[];
}

export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

export type TimePeriod = "week" | "month" | "quarter" | "year" | "custom";
