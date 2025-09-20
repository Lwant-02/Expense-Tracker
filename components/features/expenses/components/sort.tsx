import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortProps {
  onSortChange: (field: string) => void;
  sortBy: string;
  sortOrder: string;
}

export const Sort = ({ onSortChange, sortBy, sortOrder }: SortProps) => {
  const handleSortChange = (sortValue: string) => {
    const [field] = sortValue.split("-");
    if (field === sortBy) {
      onSortChange(field);
    } else {
      onSortChange(field);
    }
  };

  return (
    <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="date-desc">Date (Newest)</SelectItem>
        <SelectItem value="date-asc">Date (Oldest)</SelectItem>
        <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
        <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
        <SelectItem value="description-asc">Description (A-Z)</SelectItem>
        <SelectItem value="description-desc">Description (Z-A)</SelectItem>
      </SelectContent>
    </Select>
  );
};
