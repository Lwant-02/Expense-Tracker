"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Calendar, CreditCard } from "lucide-react";

import { getExpenseSummary } from "@/lib/expense-utils";
import { SummaryCard } from "@/components/features/dashboard/components/summary-card";
import { RecentExpenses } from "@/components/features/dashboard/components/recent-expenses";
import {
  CategoryPieChart,
  MonthlyTrendChart,
  WeeklyTrendChart,
} from "@/components/features/expenses/components/expense-charts";
import { Spinner } from "@/components/spinner";

export default function DashboardViewPage() {
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
        monthlyTrend: 0,
        weeklyTrend: 0,
        categoryBreakdown: [],
        recentExpenses: [],
      };

  // Show loading state during hydration
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your expense tracker dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Expenses"
          value={`THB ${summary.totalExpenses.toFixed(2)}`}
          description="All time spending"
          icon={DollarSign}
        />
        <SummaryCard
          title="This Month"
          value={`THB ${summary.monthlyTotal.toFixed(2)}`}
          description="Current month spending"
          icon={Calendar}
          trend={{
            value: Math.abs(summary.monthlyTrend).toFixed(2),
            isPositive: summary.monthlyTrend <= 0,
          }}
        />
        <SummaryCard
          title="This Week"
          value={`THB ${summary.weeklyTotal.toFixed(2)}`}
          description="Current week spending"
          icon={TrendingUp}
          trend={{
            value: Math.abs(summary.weeklyTrend).toFixed(2),
            isPositive: summary.weeklyTrend <= 0,
          }}
        />
        <SummaryCard
          title="Categories"
          value={summary.categoryBreakdown.length.toString()}
          description="Active categories"
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentExpenses expenses={summary.recentExpenses} />
        <CategoryPieChart />
      </div>
      <WeeklyTrendChart />
      <MonthlyTrendChart />
    </div>
  );
}
