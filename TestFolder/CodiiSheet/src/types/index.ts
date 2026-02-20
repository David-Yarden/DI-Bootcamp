export interface Category {
  id: string;
  name: string;
  hourlyRate: number;
  calculationMode: 'hourly' | 'fixed';
}

export interface Entry {
  id: string;
  categoryId: string;
  month: string; // Format: "YYYY-MM"
  hours?: number;
  fixedAmount?: number;
  comment?: string;
  createdAt: string;
}

export interface MonthlyData {
  month: string;
  entries: Entry[];
  totalHours: number;
  totalRevenue: number;
}

export interface CategoryRevenue {
  category: Category;
  hours: number;
  revenue: number;
}
