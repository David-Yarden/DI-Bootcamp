import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryList } from '@/components/categories/CategoryList';
import { EntryList } from '@/components/entries/EntryList';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { MonthSelector } from '@/components/layout/MonthSelector';
import { useCategories } from '@/hooks/useCategories';
import { useEntries } from '@/hooks/useEntries';

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function App() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { entries, addEntry, updateEntry, deleteEntry } = useEntries();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CodiiSheet</h1>
          <p className="text-muted-foreground">Gestion des revenus - Professeur Scratch</p>
        </header>

        <div className="mb-6">
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="entries">Entrées</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard
              entries={entries}
              categories={categories}
              selectedMonth={selectedMonth}
            />
          </TabsContent>

          <TabsContent value="entries">
            <EntryList
              entries={entries}
              categories={categories}
              selectedMonth={selectedMonth}
              onAdd={addEntry}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
            />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryList
              categories={categories}
              onAdd={addCategory}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App
