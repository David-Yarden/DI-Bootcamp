import { useCallback, useMemo } from 'react';
import { Entry } from '@/types';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '@/services/storage';
import { calculations } from '@/services/calculations';

const STORAGE_KEY = 'codiisheet_entries';

export function useEntries() {
  const [entries, setEntries] = useLocalStorage<Entry[]>(STORAGE_KEY, []);

  const addEntry = useCallback((entry: Omit<Entry, 'id' | 'createdAt'>) => {
    const newEntry: Entry = {
      ...entry,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setEntries(prev => [...prev, newEntry]);
    return newEntry;
  }, [setEntries]);

  const updateEntry = useCallback((id: string, updates: Partial<Omit<Entry, 'id' | 'createdAt'>>) => {
    setEntries(prev =>
      prev.map(entry => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  }, [setEntries]);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, [setEntries]);

  const getEntriesByMonth = useCallback((month: string): Entry[] => {
    return calculations.getEntriesByMonth(entries, month);
  }, [entries]);

  const getEntriesByCategory = useCallback((categoryId: string): Entry[] => {
    return entries.filter(entry => entry.categoryId === categoryId);
  }, [entries]);

  const uniqueMonths = useMemo(() => {
    return calculations.getUniqueMonths(entries);
  }, [entries]);

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByMonth,
    getEntriesByCategory,
    uniqueMonths,
  };
}
