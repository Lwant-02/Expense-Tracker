import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Expense,
  Category,
  ExpenseFilters,
  ExpenseWithCategory,
  ExpenseSummary,
  TimePeriod,
} from "@/types";

interface ExpenseStore {
  // State
  expenses: Expense[];
  categories: Category[];
  filters: ExpenseFilters;
  selectedTimePeriod: TimePeriod;

  // Actions
  addExpense: (
    expense: Omit<Expense, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  addCategory: (category: Omit<Category, "id" | "createdAt">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  setFilters: (filters: Partial<ExpenseFilters>) => void;
  clearFilters: () => void;
  setTimePeriod: (period: TimePeriod) => void;

  // Utility functions
  clearAllData: () => void;
  loadSampleData: () => void;

  // Computed values
  getFilteredExpenses: () => ExpenseWithCategory[];
  getExpenseSummary: () => ExpenseSummary;
  getCategoryById: (id: string) => Category | undefined;
}

// Default categories
const defaultCategories: Category[] = [
  {
    id: "1",
    name: "Food & Dining",
    color: "#ef4444",
    icon: "🍽️",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Transportation",
    color: "#3b82f6",
    icon: "🚗",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Shopping",
    color: "#8b5cf6",
    icon: "🛍️",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Entertainment",
    color: "#f59e0b",
    icon: "🎬",
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Bills & Utilities",
    color: "#10b981",
    icon: "💡",
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Healthcare",
    color: "#ec4899",
    icon: "🏥",
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Coffee & Drinks",
    color: "#a855f7",
    icon: "☕",
    createdAt: new Date(),
  },
];

// Deterministic sample expenses for demonstration
const createSampleExpenses = (): Expense[] => {
  const expenses: Expense[] = [];

  // Predefined sample expenses to avoid hydration issues
  const sampleData = [
    { categoryId: "1", amount: 45.5, description: "Lunch at cafe", daysAgo: 1 },
    {
      categoryId: "7",
      amount: 5.25,
      description: "Morning coffee",
      daysAgo: 1,
    },
    { categoryId: "2", amount: 25.0, description: "Gas station", daysAgo: 2 },
    {
      categoryId: "3",
      amount: 89.99,
      description: "Online purchase",
      daysAgo: 3,
    },
    {
      categoryId: "1",
      amount: 67.8,
      description: "Dinner with friends",
      daysAgo: 4,
    },
    { categoryId: "4", amount: 15.0, description: "Movie tickets", daysAgo: 5 },
    {
      categoryId: "5",
      amount: 120.0,
      description: "Electricity bill",
      daysAgo: 6,
    },
    { categoryId: "6", amount: 85.0, description: "Doctor visit", daysAgo: 7 },
    {
      categoryId: "1",
      amount: 32.45,
      description: "Grocery shopping",
      daysAgo: 8,
    },
    { categoryId: "7", amount: 4.75, description: "Starbucks", daysAgo: 9 },
    { categoryId: "2", amount: 18.5, description: "Uber ride", daysAgo: 10 },
    {
      categoryId: "3",
      amount: 156.99,
      description: "Electronics",
      daysAgo: 12,
    },
    { categoryId: "4", amount: 45.0, description: "Concert", daysAgo: 14 },
    {
      categoryId: "1",
      amount: 28.9,
      description: "Pizza delivery",
      daysAgo: 15,
    },
    {
      categoryId: "5",
      amount: 89.99,
      description: "Internet bill",
      daysAgo: 16,
    },
    { categoryId: "6", amount: 45.0, description: "Pharmacy", daysAgo: 18 },
    { categoryId: "2", amount: 12.0, description: "Parking fee", daysAgo: 20 },
    {
      categoryId: "1",
      amount: 78.5,
      description: "Restaurant meal",
      daysAgo: 22,
    },
    {
      categoryId: "3",
      amount: 234.99,
      description: "Clothing store",
      daysAgo: 25,
    },
    {
      categoryId: "4",
      amount: 29.99,
      description: "Streaming service",
      daysAgo: 28,
    },
    { categoryId: "5", amount: 65.0, description: "Phone bill", daysAgo: 30 },
    {
      categoryId: "1",
      amount: 52.3,
      description: "Lunch at cafe",
      daysAgo: 32,
    },
    { categoryId: "7", amount: 6.5, description: "Energy drink", daysAgo: 33 },
    { categoryId: "2", amount: 35.0, description: "Taxi fare", daysAgo: 35 },
    {
      categoryId: "6",
      amount: 125.0,
      description: "Dental checkup",
      daysAgo: 38,
    },
    { categoryId: "3", amount: 89.99, description: "Home goods", daysAgo: 40 },
    { categoryId: "4", amount: 85.0, description: "Gaming", daysAgo: 42 },
    {
      categoryId: "1",
      amount: 41.25,
      description: "Dinner with friends",
      daysAgo: 45,
    },
    { categoryId: "5", amount: 1200.0, description: "Rent", daysAgo: 46 },
    { categoryId: "7", amount: 8.75, description: "Smoothie", daysAgo: 48 },
    { categoryId: "2", amount: 45.0, description: "Gas station", daysAgo: 50 },
    { categoryId: "3", amount: 67.99, description: "Books", daysAgo: 52 },
    { categoryId: "6", amount: 95.0, description: "Medicine", daysAgo: 55 },
    {
      categoryId: "1",
      amount: 38.9,
      description: "Grocery shopping",
      daysAgo: 58,
    },
    {
      categoryId: "4",
      amount: 125.0,
      description: "Sports event",
      daysAgo: 60,
    },
    { categoryId: "7", amount: 5.5, description: "Tea", daysAgo: 62 },
    { categoryId: "5", amount: 78.5, description: "Water bill", daysAgo: 65 },
    { categoryId: "2", amount: 22.0, description: "Bus ticket", daysAgo: 68 },
    {
      categoryId: "1",
      amount: 56.75,
      description: "Restaurant meal",
      daysAgo: 70,
    },
    {
      categoryId: "3",
      amount: 189.99,
      description: "Electronics",
      daysAgo: 72,
    },
  ];

  const now = new Date();

  sampleData.forEach((item, index) => {
    const date = new Date(now);
    date.setDate(date.getDate() - item.daysAgo);

    expenses.push({
      id: `sample-${index}`,
      amount: item.amount,
      description: item.description,
      categoryId: item.categoryId,
      date,
      createdAt: date,
      updatedAt: date,
    });
  });

  return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      // Initial state
      expenses: [],
      categories: defaultCategories,
      filters: {
        sortBy: "date",
        sortOrder: "desc",
      },
      selectedTimePeriod: "month",

      // Actions
      addExpense: (expenseData) => {
        const newExpense: Expense = {
          ...expenseData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          expenses: [...state.expenses, newExpense],
        }));
      },

      updateExpense: (id, expenseData) => {
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id
              ? { ...expense, ...expenseData, updatedAt: new Date() }
              : expense
          ),
        }));
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },

      addCategory: (categoryData) => {
        const newCategory: Category = {
          ...categoryData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, categoryData) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...categoryData } : category
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
          // Also remove the category from any expenses
          expenses: state.expenses.filter(
            (expense) => expense.categoryId !== id
          ),
        }));
      },

      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
      },

      clearFilters: () => {
        set({
          filters: {
            sortBy: "date",
            sortOrder: "desc",
          },
        });
      },

      setTimePeriod: (period) => {
        set({ selectedTimePeriod: period });
      },

      // Computed values
      getFilteredExpenses: () => {
        const { expenses, categories, filters } = get();
        let filtered = expenses.map((expense) => ({
          ...expense,
          category: categories.find((cat) => cat.id === expense.categoryId)!,
        }));

        // Apply filters
        if (filters.categoryId) {
          filtered = filtered.filter(
            (expense) => expense.categoryId === filters.categoryId
          );
        }

        if (filters.dateFrom) {
          filtered = filtered.filter((expense) => {
            const expenseDate =
              expense.date instanceof Date
                ? expense.date
                : new Date(expense.date);
            return expenseDate >= filters.dateFrom!;
          });
        }

        if (filters.dateTo) {
          filtered = filtered.filter((expense) => {
            const expenseDate =
              expense.date instanceof Date
                ? expense.date
                : new Date(expense.date);
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
          let aValue: any, bValue: any;

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
      },

      getExpenseSummary: () => {
        const { expenses, categories } = get();
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        const totalExpenses = expenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        const monthlyExpenses = expenses.filter((expense) => {
          const expenseDate =
            expense.date instanceof Date
              ? expense.date
              : new Date(expense.date);
          return expenseDate >= startOfMonth;
        });
        const monthlyTotal = monthlyExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        const weeklyExpenses = expenses.filter((expense) => {
          const expenseDate =
            expense.date instanceof Date
              ? expense.date
              : new Date(expense.date);
          return expenseDate >= startOfWeek;
        });
        const weeklyTotal = weeklyExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

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
        const recentExpenses = expenses
          .map((expense) => ({
            ...expense,
            category: categories.find((cat) => cat.id === expense.categoryId)!,
          }))
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
          categoryBreakdown,
          recentExpenses,
        };
      },

      getCategoryById: (id) => {
        return get().categories.find((category) => category.id === id);
      },

      // Utility functions
      clearAllData: () => {
        set({
          expenses: [],
          categories: defaultCategories,
        });
      },

      loadSampleData: () => {
        set({
          expenses: createSampleExpenses(),
          categories: defaultCategories,
        });
      },
    }),
    {
      name: "expense-tracker-storage",
      partialize: (state) => ({
        expenses: state.expenses,
        categories: state.categories,
        filters: state.filters,
        selectedTimePeriod: state.selectedTimePeriod,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert date strings back to Date objects
          state.expenses = state.expenses.map((expense) => ({
            ...expense,
            date: new Date(expense.date),
            createdAt: new Date(expense.createdAt),
            updatedAt: new Date(expense.updatedAt),
          }));

          state.categories = state.categories.map((category) => ({
            ...category,
            createdAt: new Date(category.createdAt),
          }));
        }
      },
    }
  )
);
