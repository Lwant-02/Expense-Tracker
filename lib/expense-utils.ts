import { DEMO_CATEGORIES, DEMO_EXPENSES } from "@/constants/demo-data";

// Get expenses with category information
export function getExpensesWithCategories(): ExpenseWithCategory[] {
  return DEMO_EXPENSES.map((expense) => ({
    ...expense,
    category: DEMO_CATEGORIES.find((cat) => cat.id === expense.categoryId)!,
  }));
}

// Filter and sort expenses based on filters
export function getFilteredExpenses(
  filters: ExpenseFilters
): ExpenseWithCategory[] {
  let filtered = getExpensesWithCategories();

  // Apply filters
  if (filters.categoryId) {
    filtered = filtered.filter(
      (expense) => expense.categoryId === filters.categoryId
    );
  }

  if (filters.dateFrom) {
    filtered = filtered.filter((expense) => {
      const expenseDate =
        expense.date instanceof Date ? expense.date : new Date(expense.date);
      return expenseDate >= filters.dateFrom!;
    });
  }

  if (filters.dateTo) {
    filtered = filtered.filter((expense) => {
      const expenseDate =
        expense.date instanceof Date ? expense.date : new Date(expense.date);
      return expenseDate <= filters.dateTo!;
    });
  }

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (expense) =>
        expense.description.toLowerCase().includes(searchLower) ||
        expense.category.name.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (filters.sortBy) {
      case "amount":
        aValue = a.amount;
        bValue = b.amount;
        break;
      case "description":
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
        break;
      case "category":
        aValue = a.category.name.toLowerCase();
        bValue = b.category.name.toLowerCase();
        break;
      default:
        aValue = a.date instanceof Date ? a.date : new Date(a.date);
        bValue = b.date instanceof Date ? b.date : new Date(b.date);
    }

    if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return filtered;
}

// Get expense summary for dashboard
export function getExpenseSummary(): ExpenseSummary {
  const expenses = DEMO_EXPENSES;
  const categories = DEMO_CATEGORIES;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  // Previous month for trend calculation
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Previous week for trend calculation
  const startOfPrevWeek = new Date(startOfWeek);
  startOfPrevWeek.setDate(startOfPrevWeek.getDate() - 7);
  const endOfPrevWeek = new Date(startOfWeek);
  endOfPrevWeek.setDate(endOfPrevWeek.getDate() - 1);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Current month expenses
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate =
      expense.date instanceof Date ? expense.date : new Date(expense.date);
    return expenseDate >= startOfMonth;
  });
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Previous month expenses for trend
  const prevMonthlyExpenses = expenses.filter((expense) => {
    const expenseDate =
      expense.date instanceof Date ? expense.date : new Date(expense.date);
    return expenseDate >= startOfPrevMonth && expenseDate <= endOfPrevMonth;
  });
  const prevMonthlyTotal = prevMonthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Current week expenses
  const weeklyExpenses = expenses.filter((expense) => {
    const expenseDate =
      expense.date instanceof Date ? expense.date : new Date(expense.date);
    return expenseDate >= startOfWeek;
  });
  const weeklyTotal = weeklyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Previous week expenses for trend
  const prevWeeklyExpenses = expenses.filter((expense) => {
    const expenseDate =
      expense.date instanceof Date ? expense.date : new Date(expense.date);
    return expenseDate >= startOfPrevWeek && expenseDate <= endOfPrevWeek;
  });
  const prevWeeklyTotal = prevWeeklyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Calculate trends
  const monthlyTrend =
    prevMonthlyTotal > 0
      ? ((monthlyTotal - prevMonthlyTotal) / prevMonthlyTotal) * 100
      : monthlyTotal > 0
      ? 100
      : 0;

  const weeklyTrend =
    prevWeeklyTotal > 0
      ? ((weeklyTotal - prevWeeklyTotal) / prevWeeklyTotal) * 100
      : weeklyTotal > 0
      ? 100
      : 0;

  // Category breakdown
  const categoryTotals = new Map<string, number>();
  expenses.forEach((expense) => {
    const current = categoryTotals.get(expense.categoryId) || 0;
    categoryTotals.set(expense.categoryId, current + expense.amount);
  });

  const categoryBreakdown = Array.from(categoryTotals.entries()).map(
    ([categoryId, total]) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return {
        categoryId,
        categoryName: category?.name || "Unknown",
        total,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
        color: category?.color || "#6b7280",
      };
    }
  );

  // Recent expenses (last 5)
  const recentExpenses = getExpensesWithCategories()
    .sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5);

  return {
    totalExpenses,
    monthlyTotal,
    weeklyTotal,
    monthlyTrend,
    weeklyTrend,
    categoryBreakdown,
    recentExpenses,
  };
}

// Get category by ID
export function getCategoryById(id: string) {
  return DEMO_CATEGORIES.find((category) => category.id === id);
}

// Get monthly chart data for the last 6 months
export function getMonthlyChartData() {
  const now = new Date();
  const months = [];

  // Generate last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const monthExpenses = DEMO_EXPENSES.filter((expense) => {
      const expenseDate =
        expense.date instanceof Date ? expense.date : new Date(expense.date);
      return expenseDate >= monthStart && expenseDate <= monthEnd;
    });

    const total = monthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    months.push({
      month: date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      total: total,
    });
  }

  return months;
}

// Get weekly chart data for the last 7 days
export function getWeeklyChartData() {
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - 6); // last 7 days including today

  const lastWeekExpenses = DEMO_EXPENSES.filter((expense) => {
    const expenseDate =
      expense.date instanceof Date ? expense.date : new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= now;
  });

  const chartData = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);

    const totalForDay = lastWeekExpenses
      .filter((expense) => {
        const expenseDate =
          expense.date instanceof Date ? expense.date : new Date(expense.date);
        return (
          expenseDate.getFullYear() === day.getFullYear() &&
          expenseDate.getMonth() === day.getMonth() &&
          expenseDate.getDate() === day.getDate()
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    chartData.push({
      date: day,
      total: totalForDay,
    });
  }

  return chartData;
}
