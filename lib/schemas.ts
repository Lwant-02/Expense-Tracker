import { z } from "zod";

// Expense form schema
export const expenseFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Amount must be a positive number"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be less than 200 characters"),
  categoryId: z.string().min(1, "Category is required"),
  date: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: "Date is required and must be valid",
  }),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

// Category form schema
export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name must be less than 50 characters")
    .trim(),
  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
  icon: z
    .string()
    .min(1, "Icon is required")
    .max(10, "Icon must be less than 10 characters"),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
