import { Suspense } from "react";
import ExpensesViewPage from "@/components/features/expenses/expenses-view-page";
import { Spinner } from "@/components/spinner";

export const metadata = {
  title: "Expense Tracker | Expenses",
  description: "View and manage all your expenses",
};

export default function ExpensesPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ExpensesViewPage />
    </Suspense>
  );
}
