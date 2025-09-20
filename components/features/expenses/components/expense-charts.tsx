"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { format } from "date-fns";

import {
  getExpenseSummary,
  getMonthlyChartData,
  getWeeklyChartData,
} from "@/lib/expense-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CategoryPieChart() {
  const summary = getExpenseSummary();

  const data = summary.categoryBreakdown.map((category) => ({
    name: category.categoryName,
    value: category.total,
    color: category.color,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No data to display
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              className="text-sm cursor-pointer"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                `THB ${Number(value).toFixed(2)}`,
                "Amount",
              ]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "6px",
              }}
              itemStyle={{ color: "#ffffff" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function MonthlyTrendChart() {
  const data = useMemo(() => {
    return getMonthlyChartData();
  }, []);

  // Check if there's any data to display
  const hasData = data.some((item) => item.total > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>6 Monthly Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `THB ${value}`}
              />
              <Tooltip
                formatter={(value) => [
                  `THB ${Number(value).toFixed(2)}`,
                  "Total",
                ]}
                labelStyle={{ color: "#eeeeee" }}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">No expense data available</p>
              <p className="text-sm">
                Add some expenses to see the monthly trend
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const WeeklyTrendChart = () => {
  const data = useMemo(() => {
    return getWeeklyChartData();
  }, []);

  // Check if there's any data to display
  const hasData = data.some((item) => item.total > 0);
  const year = new Date().getFullYear();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Spending Trend {year}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return format(d, "EE dd MMM");
                }}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `THB ${value}`}
              />
              <Tooltip
                formatter={(value) => [
                  `THB ${Number(value).toFixed(2)}`,
                  "Total",
                ]}
                labelStyle={{ color: "#eeeeee" }}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                }}
                labelFormatter={(label) => {
                  const d = new Date(label);
                  return format(d, "EEE dd MMM");
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">No expense data available</p>
              <p className="text-sm">
                Add some expenses to see the weekly trend
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
