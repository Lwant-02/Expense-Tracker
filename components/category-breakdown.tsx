"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CategoryBreakdownProps {
  categories: Array<{
    categoryId: string;
    categoryName: string;
    total: number;
    percentage: number;
    color: string;
  }>;
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No expenses to show breakdown
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="max-h-72 overflow-y-auto overflow-scroll">
        <div className="space-y-4">
          {categories
            .sort((a, b) => b.total - a.total)
            .slice(0, 6)
            .map((category) => (
              <div key={category.categoryId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium">
                      {category.categoryName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">
                      ${category.total.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {category.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={category.percentage}
                  className="h-2"
                  style={
                    {
                      "--progress-background": category.color,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
