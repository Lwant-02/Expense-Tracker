import { DEMO_CATEGORIES } from "@/constants/demo-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string) => void;
  selectedCategory: string;
}

export const CategoryFilter = ({
  onCategoryChange,
  selectedCategory,
}: CategoryFilterProps) => {
  const categories = DEMO_CATEGORIES;

  const handleCategoryFilter = (categoryId: string) => {
    onCategoryChange(categoryId === "all" ? "" : categoryId);
  };
  return (
    <Select
      value={selectedCategory || "all"}
      onValueChange={handleCategoryFilter}
    >
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
