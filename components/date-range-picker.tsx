"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  subWeeks,
} from "date-fns";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Use DateRange type from react-day-picker for compatibility
import type { DateRange } from "react-day-picker";

const presetRanges = [
  {
    label: "This Week",
    value: "this-week",
    getRange: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    }),
  },
  {
    label: "Last Week",
    value: "last-week",
    getRange: () => ({
      from: startOfWeek(subWeeks(new Date(), 1)),
      to: endOfWeek(subWeeks(new Date(), 1)),
    }),
  },
  {
    label: "This Month",
    value: "this-month",
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Last Month",
    value: "last-month",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    label: "Last 3 Months",
    value: "last-3-months",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 2)),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Last 6 Months",
    value: "last-6-months",
    getRange: () => ({
      from: startOfMonth(subMonths(new Date(), 5)),
      to: endOfMonth(new Date()),
    }),
  },
];

export function DateRangePicker() {
  const { filters, setFilters } = useAppStore();
  const [selectedPreset, setSelectedPreset] = useState<string>("all");
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);

    if (value === "all") {
      setFilters({ dateFrom: undefined, dateTo: undefined });
      setCustomRange(undefined);
    } else if (value === "custom") {
      // Keep current custom range or clear if none
      if (!customRange) {
        setFilters({ dateFrom: undefined, dateTo: undefined });
      }
    } else {
      const preset = presetRanges.find((p) => p.value === value);
      if (preset) {
        const range = preset.getRange();
        setFilters({ dateFrom: range.from, dateTo: range.to });
        setCustomRange(range);
      }
    }
  };

  const handleCustomRangeSelect = (range: DateRange | undefined) => {
    setCustomRange(range);
    if (range && range.from && range.to) {
      setFilters({ dateFrom: range.from, dateTo: range.to });
      setSelectedPreset("custom");
    } else {
      setFilters({ dateFrom: undefined, dateTo: undefined });
      setSelectedPreset("all");
    }
    setIsCalendarOpen(false);
  };

  const formatDateRange = () => {
    if (!filters.dateFrom || !filters.dateTo) {
      return "All time";
    }

    if (selectedPreset !== "custom") {
      const preset = presetRanges.find((p) => p.value === selectedPreset);
      return preset?.label || "Custom range";
    }

    return `${format(filters.dateFrom, "MMM dd")} - ${format(
      filters.dateTo,
      "MMM dd"
    )}`;
  };

  return (
    <div className="flex gap-2">
      <Select value={selectedPreset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          {presetRanges.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {selectedPreset === "custom" && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !customRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={customRange}
              onSelect={handleCustomRangeSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
