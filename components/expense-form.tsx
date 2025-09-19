"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useExpenseStore } from "@/store/store";
import { Expense } from "@/types";
import { expenseFormSchema, ExpenseFormData } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ExpenseFormProps {
  expense?: Expense;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ExpenseForm({
  expense,
  onSuccess,
  onCancel,
}: ExpenseFormProps) {
  const { categories, addExpense, updateExpense } = useExpenseStore();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: expense?.amount?.toString() || "",
      description: expense?.description || "",
      categoryId: expense?.categoryId || "",
      date: expense?.date || new Date(),
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      const expenseData = {
        amount: parseFloat(data.amount),
        description: data.description.trim(),
        categoryId: data.categoryId,
        date: data.date,
      };

      if (expense) {
        updateExpense(expense.id, expenseData);
      } else {
        addExpense(expenseData);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleAmountChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    // Allow only numbers and decimal point
    const sanitized = value.replace(/[^0-9.]/g, "");
    // Prevent multiple decimal points
    const parts = sanitized.split(".");
    if (parts.length <= 2) {
      onChange(sanitized);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="text"
                    placeholder="0.00"
                    className="pl-8"
                    {...field}
                    onChange={(e) =>
                      handleAmountChange(e.target.value, field.onChange)
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="What did you spend on?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-52">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 justify-center items-center">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : expense
              ? "Update Expense"
              : "Add Expense"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onCancel}
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
