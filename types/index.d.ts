interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: Date;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ExpenseWithCategory extends Expense {
  category: Category;
}

interface ExpenseFilters {
  categoryId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
  sortBy?: "date" | "amount" | "description" | "category";
  sortOrder?: "asc" | "desc";
}

interface ExpenseSummary {
  totalExpenses: number;
  monthlyTotal: number;
  weeklyTotal: number;
  monthlyTrend: number;
  weeklyTrend: number;
  categoryBreakdown: Array<{
    categoryId: string;
    categoryName: string;
    total: number;
    percentage: number;
    color: string;
  }>;
  recentExpenses: ExpenseWithCategory[];
}

interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

type TimePeriod = "week" | "month" | "quarter" | "year" | "custom";
