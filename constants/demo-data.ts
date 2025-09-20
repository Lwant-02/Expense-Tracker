// Categories
export const DEMO_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Food & Dining",
    color: "#ef4444",
    icon: "🍽️",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Transportation",
    color: "#3b82f6",
    icon: "🚗",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Shopping",
    color: "#8b5cf6",
    icon: "🛍️",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    name: "Entertainment",
    color: "#f59e0b",
    icon: "🎬",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    name: "Bills & Utilities",
    color: "#10b981",
    icon: "💡",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "6",
    name: "Healthcare",
    color: "#ec4899",
    icon: "🏥",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "7",
    name: "Coffee & Drinks",
    color: "#a855f7",
    icon: "☕",
    createdAt: new Date("2024-01-01"),
  },
];

// Sample expenses data
const createDemoExpenses = (): Expense[] => {
  const now = new Date();

  const sampleData = [
    { categoryId: "1", amount: 45.5, description: "Lunch at cafe", daysAgo: 1 },
    {
      categoryId: "7",
      amount: 5.25,
      description: "Morning coffee",
      daysAgo: 1,
    },
    { categoryId: "2", amount: 25.0, description: "Gas station", daysAgo: 2 },
    {
      categoryId: "3",
      amount: 89.99,
      description: "Online purchase",
      daysAgo: 3,
    },
    {
      categoryId: "1",
      amount: 67.8,
      description: "Dinner with friends",
      daysAgo: 4,
    },
    { categoryId: "4", amount: 15.0, description: "Movie tickets", daysAgo: 5 },
    {
      categoryId: "5",
      amount: 120.0,
      description: "Electricity bill",
      daysAgo: 6,
    },
    { categoryId: "6", amount: 85.0, description: "Doctor visit", daysAgo: 7 },
    {
      categoryId: "1",
      amount: 32.45,
      description: "Grocery shopping",
      daysAgo: 8,
    },
    { categoryId: "7", amount: 4.75, description: "Starbucks", daysAgo: 9 },
    { categoryId: "2", amount: 18.5, description: "Uber ride", daysAgo: 10 },
    {
      categoryId: "3",
      amount: 156.99,
      description: "Electronics",
      daysAgo: 12,
    },
    { categoryId: "4", amount: 45.0, description: "Concert", daysAgo: 14 },
    {
      categoryId: "1",
      amount: 28.9,
      description: "Pizza delivery",
      daysAgo: 15,
    },
    {
      categoryId: "5",
      amount: 89.99,
      description: "Internet bill",
      daysAgo: 16,
    },
    { categoryId: "6", amount: 45.0, description: "Pharmacy", daysAgo: 18 },
    { categoryId: "2", amount: 12.0, description: "Parking fee", daysAgo: 20 },
    {
      categoryId: "1",
      amount: 78.5,
      description: "Restaurant meal",
      daysAgo: 22,
    },
    {
      categoryId: "3",
      amount: 234.99,
      description: "Clothing store",
      daysAgo: 25,
    },
    {
      categoryId: "4",
      amount: 29.99,
      description: "Streaming service",
      daysAgo: 28,
    },
    { categoryId: "5", amount: 65.0, description: "Phone bill", daysAgo: 30 },
    {
      categoryId: "1",
      amount: 52.3,
      description: "Lunch at cafe",
      daysAgo: 32,
    },
    { categoryId: "7", amount: 6.5, description: "Energy drink", daysAgo: 33 },
    { categoryId: "2", amount: 35.0, description: "Taxi fare", daysAgo: 35 },
    {
      categoryId: "6",
      amount: 125.0,
      description: "Dental checkup",
      daysAgo: 38,
    },
    { categoryId: "3", amount: 89.99, description: "Home goods", daysAgo: 40 },
    { categoryId: "4", amount: 85.0, description: "Gaming", daysAgo: 42 },
    {
      categoryId: "1",
      amount: 41.25,
      description: "Dinner with friends",
      daysAgo: 45,
    },
    { categoryId: "5", amount: 1200.0, description: "Rent", daysAgo: 46 },
    { categoryId: "7", amount: 8.75, description: "Smoothie", daysAgo: 48 },
    { categoryId: "2", amount: 45.0, description: "Gas station", daysAgo: 50 },
    { categoryId: "3", amount: 67.99, description: "Books", daysAgo: 52 },
    { categoryId: "6", amount: 95.0, description: "Medicine", daysAgo: 55 },
    {
      categoryId: "1",
      amount: 38.9,
      description: "Grocery shopping",
      daysAgo: 58,
    },
    {
      categoryId: "4",
      amount: 125.0,
      description: "Sports event",
      daysAgo: 60,
    },
    { categoryId: "7", amount: 5.5, description: "Tea", daysAgo: 62 },
    { categoryId: "5", amount: 78.5, description: "Water bill", daysAgo: 65 },
    { categoryId: "2", amount: 22.0, description: "Bus ticket", daysAgo: 68 },
    {
      categoryId: "1",
      amount: 56.75,
      description: "Restaurant meal",
      daysAgo: 70,
    },
    {
      categoryId: "3",
      amount: 189.99,
      description: "Electronics",
      daysAgo: 72,
    },
  ];

  return sampleData
    .map((item, index) => {
      const date = new Date(now);
      date.setDate(date.getDate() - item.daysAgo);

      return {
        id: `demo-${index + 1}`,
        amount: item.amount,
        description: item.description,
        categoryId: item.categoryId,
        date,
        createdAt: date,
        updatedAt: date,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const DEMO_EXPENSES = createDemoExpenses();
