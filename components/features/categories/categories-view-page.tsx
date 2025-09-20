"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CategoryList } from "@/components/features/categories/components/category-list";
import { CategoryForm } from "@/components/features/categories/components/category-form";
import { Button } from "@/components/ui/button";

import { CustomDialog } from "@/components/custom-dialog";

export default function CategoriesViewPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your expense categories
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoryList onEditCategory={handleEditCategory} />

      {/* Add Category Dialog */}
      <CustomDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSuccess={handleAddSuccess}
          onCancel={() => setIsAddDialogOpen(false)}
        />
      </CustomDialog>

      {/* Edit Category Dialog */}
      <CustomDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Edit Category"
      >
        {editingCategory && (
          <CategoryForm
            category={editingCategory}
            onSuccess={handleEditSuccess}
            onCancel={() => {
              setIsEditDialogOpen(false);
              setEditingCategory(null);
            }}
          />
        )}
      </CustomDialog>
    </div>
  );
}
