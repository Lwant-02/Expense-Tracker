import { create } from "zustand";

interface AppStore {
  filters: ExpenseFilters;
  setFilters: (filters: Partial<ExpenseFilters>) => void;
  clearFilters: () => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  filters: {
    sortBy: "date",
    sortOrder: "desc",
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        sortBy: "date",
        sortOrder: "desc",
      },
    });
  },
}));
