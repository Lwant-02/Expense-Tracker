"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { useExpenseStore } from "@/store/store";
import { SummaryCard } from "@/components/summary-card";
import { RecentExpenses } from "@/components/recent-expenses";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { MonthlyTrendChart } from "@/components/expense-charts";

export default function DashboardViewPage() {
  const { getExpenseSummary, expenses, loadSampleData } = useExpenseStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const summary = isHydrated
    ? getExpenseSummary()
    : {
        totalExpenses: 0,
        monthlyTotal: 0,
        weeklyTotal: 0,
        transactionCount: 0,
        categoryBreakdown: [],
        recentExpenses: [],
      };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show welcome message if no expenses (only after hydration)
  if (expenses.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome to Expense Tracker
          </h2>
          <p className="text-muted-foreground">
            Get started by adding your first expense or loading sample data
          </p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">No expenses yet</h3>
            <p className="text-muted-foreground max-w-md">
              Start tracking your expenses by adding your first expense or load
              sample data to explore the features.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={loadSampleData}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Load Sample Data
            </button>
            <a
              href="/add-expense"
              className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
            >
              Add First Expense
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your expense tracker dashboard
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Expenses"
          value={`$${summary.totalExpenses.toFixed(2)}`}
          description="All time spending"
          icon={DollarSign}
        />
        <SummaryCard
          title="This Month"
          value={`$${summary.monthlyTotal.toFixed(2)}`}
          description="Current month spending"
          icon={Calendar}
        />
        <SummaryCard
          title="This Week"
          value={`$${summary.weeklyTotal.toFixed(2)}`}
          description="Current week spending"
          icon={TrendingUp}
        />
        <SummaryCard
          title="Categories"
          value={summary.categoryBreakdown.length.toString()}
          description="Active categories"
          icon={CreditCard}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentExpenses expenses={summary.recentExpenses} />
        <CategoryBreakdown categories={summary.categoryBreakdown} />
      </div>
      <MonthlyTrendChart />
    </div>
  );
}
