import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const NoData = () => {
  const router = useRouter();
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
          <Button
            onClick={() => router.push("/expenses")}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Expense
          </Button>
        </div>
      </div>
    </div>
  );
};
