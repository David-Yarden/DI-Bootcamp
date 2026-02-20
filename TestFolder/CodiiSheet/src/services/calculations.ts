import { Category, Entry, CategoryRevenue } from '@/types';

export const calculations = {
  // Calculate revenue for a single entry
  calculateEntryRevenue: (entry: Entry, category: Category): number => {
    if (category.calculationMode === 'fixed') {
      return entry.fixedAmount ?? 0;
    }
    return (entry.hours ?? 0) * category.hourlyRate;
  },

  // Calculate total revenue for entries with their categories
  calculateTotalRevenue: (entries: Entry[], categories: Category[]): number => {
    return entries.reduce((total, entry) => {
      const category = categories.find(c => c.id === entry.categoryId);
      if (!category) return total;
      return total + calculations.calculateEntryRevenue(entry, category);
    }, 0);
  },

  // Calculate total hours
  calculateTotalHours: (entries: Entry[]): number => {
    return entries.reduce((total, entry) => total + (entry.hours ?? 0), 0);
  },

  // Get revenue breakdown by category
  getRevenueByCategory: (entries: Entry[], categories: Category[]): CategoryRevenue[] => {
    return categories.map(category => {
      const categoryEntries = entries.filter(e => e.categoryId === category.id);
      const hours = categoryEntries.reduce((sum, e) => sum + (e.hours ?? 0), 0);
      const revenue = categoryEntries.reduce((sum, entry) => {
        return sum + calculations.calculateEntryRevenue(entry, category);
      }, 0);
      return { category, hours, revenue };
    }).filter(cr => cr.hours > 0 || cr.revenue > 0);
  },

  // Filter entries by month
  getEntriesByMonth: (entries: Entry[], month: string): Entry[] => {
    return entries.filter(entry => entry.month === month);
  },

  // Get all unique months from entries
  getUniqueMonths: (entries: Entry[]): string[] => {
    const months = [...new Set(entries.map(e => e.month))];
    return months.sort().reverse(); // Most recent first
  },

  // Format currency (shekels)
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(amount);
  },

  // Format month for display
  formatMonth: (month: string): string => {
    const [year, monthNum] = month.split('-');
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  },
};
