import { useState, useEffect } from 'react';
import { Entry, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EntryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (entry: Omit<Entry, 'id' | 'createdAt'>) => void;
  categories: Category[];
  entry?: Entry;
  defaultMonth?: string;
}

export function EntryForm({
  open,
  onOpenChange,
  onSubmit,
  categories,
  entry,
  defaultMonth
}: EntryFormProps) {
  const [categoryId, setCategoryId] = useState('');
  const [month, setMonth] = useState('');
  const [hours, setHours] = useState('');
  const [fixedAmount, setFixedAmount] = useState('');
  const [comment, setComment] = useState('');

  const selectedCategory = categories.find(c => c.id === categoryId);

  useEffect(() => {
    if (entry) {
      setCategoryId(entry.categoryId);
      setMonth(entry.month);
      setHours(entry.hours?.toString() ?? '');
      setFixedAmount(entry.fixedAmount?.toString() ?? '');
      setComment(entry.comment ?? '');
    } else {
      setCategoryId('');
      setMonth(defaultMonth || getCurrentMonth());
      setHours('');
      setFixedAmount('');
      setComment('');
    }
  }, [entry, open, defaultMonth]);

  const getCurrentMonth = (): string => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      categoryId,
      month,
      hours: hours ? parseFloat(hours) : undefined,
      fixedAmount: fixedAmount ? parseFloat(fixedAmount) : undefined,
      comment: comment || undefined,
    });
    onOpenChange(false);
  };

  // Generate month options (from January 2024 to December 2030)
  const monthOptions = () => {
    const options: { value: string; label: string }[] = [];
    for (let year = 2024; year <= 2030; year++) {
      for (let m = 1; m <= 12; m++) {
        const value = `${year}-${String(m).padStart(2, '0')}`;
        const date = new Date(year, m - 1);
        const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        options.push({ value, label });
      }
    }
    return options;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {entry ? 'Modifier l\'entrée' : 'Nouvelle entrée'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Mois</Label>
            <Select value={month} onValueChange={setMonth} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un mois" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions().map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory?.calculationMode === 'hourly' ? (
            <div className="space-y-2">
              <Label htmlFor="hours">Nombre d'heures</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          ) : selectedCategory?.calculationMode === 'fixed' ? (
            <div className="space-y-2">
              <Label htmlFor="fixedAmount">Montant (₪)</Label>
              <Input
                id="fixedAmount"
                type="number"
                step="0.01"
                min="0"
                value={fixedAmount}
                onChange={(e) => setFixedAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire (optionnel)</Label>
            <Input
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Notes..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={!categoryId}>
              {entry ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
