"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { categoryFormSchema, CategoryFormData } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const predefinedColors = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#d946ef", // fuchsia
  "#ec4899", // pink
  "#f43f5e", // rose
];

const predefinedIcons = [
  "🍽️",
  "🛒",
  "🚗",
  "🏠",
  "💡",
  "🎬",
  "🏥",
  "📚",
  "👕",
  "✈️",
  "☕",
  "🎮",
  "💰",
  "🎵",
  "🏋️",
  "🐕",
  "🌱",
  "🔧",
  "📱",
  "🎨",
];

export function CategoryForm({
  category,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      color: category?.color || predefinedColors[0],
      icon: category?.icon || predefinedIcons[0],
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      toast.success("Success!", {
        description: "Your Category has been saved successfully.",
      });
      console.log(data);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g., Food & Dining"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="grid grid-cols-8 gap-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                        field.value === color
                          ? "border-foreground"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => field.onChange(color)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <div className="grid grid-cols-10 gap-2">
                  {predefinedIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`w-8 h-8 cursor-pointer rounded border text-lg flex items-center justify-center ${
                        field.value === icon
                          ? "border-foreground bg-accent"
                          : "border-border hover:bg-accent"
                      }`}
                      onClick={() => field.onChange(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 justify-center items-center">
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
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : category
              ? "Update Category"
              : "Add Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
