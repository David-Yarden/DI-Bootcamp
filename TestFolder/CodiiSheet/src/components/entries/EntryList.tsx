import { useState } from 'react';
import { Entry, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EntryForm } from './EntryForm';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { calculations } from '@/services/calculations';

interface EntryListProps {
  entries: Entry[];
  categories: Category[];
  selectedMonth: string;
  onAdd: (entry: Omit<Entry, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, updates: Partial<Omit<Entry, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export function EntryList({
  entries,
  categories,
  selectedMonth,
  onAdd,
  onUpdate,
  onDelete,
}: EntryListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>();

  const filteredEntries = calculations.getEntriesByMonth(entries, selectedMonth);

  const handleAdd = () => {
    setEditingEntry(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Entry, 'id' | 'createdAt'>) => {
    if (editingEntry) {
      onUpdate(editingEntry.id, data);
    } else {
      onAdd(data);
    }
  };

  const getCategoryName = (categoryId: string): string => {
    return categories.find(c => c.id === categoryId)?.name ?? 'Inconnu';
  };

  const getCategory = (categoryId: string): Category | undefined => {
    return categories.find(c => c.id === categoryId);
  };

  const getEntryRevenue = (entry: Entry): string => {
    const category = getCategory(entry.categoryId);
    if (!category) return '-';
    return calculations.formatCurrency(calculations.calculateEntryRevenue(entry, category));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Entrées - {calculations.formatMonth(selectedMonth)}</CardTitle>
        <Button onClick={handleAdd} size="sm" disabled={categories.length === 0}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Créez d'abord des catégories avant d'ajouter des entrées.
          </p>
        ) : filteredEntries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Aucune entrée pour ce mois. Cliquez sur "Ajouter" pour créer une entrée.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Catégorie</TableHead>
                <TableHead>Heures/Montant</TableHead>
                <TableHead>Revenu</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => {
                const category = getCategory(entry.categoryId);
                return (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {getCategoryName(entry.categoryId)}
                    </TableCell>
                    <TableCell>
                      {category?.calculationMode === 'hourly'
                        ? `${entry.hours ?? 0} h`
                        : calculations.formatCurrency(entry.fixedAmount ?? 0)}
                    </TableCell>
                    <TableCell>{getEntryRevenue(entry)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {entry.comment || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(entry)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(entry.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <EntryForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        categories={categories}
        entry={editingEntry}
        defaultMonth={selectedMonth}
      />
    </Card>
  );
}
