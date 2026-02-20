import { useState, useEffect } from 'react';
import { Category } from '@/types';
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

interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (category: Omit<Category, 'id'>) => void;
  category?: Category;
}

export function CategoryForm({ open, onOpenChange, onSubmit, category }: CategoryFormProps) {
  const [name, setName] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [calculationMode, setCalculationMode] = useState<'hourly' | 'fixed'>('hourly');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setHourlyRate(category.hourlyRate.toString());
      setCalculationMode(category.calculationMode);
    } else {
      setName('');
      setHourlyRate('');
      setCalculationMode('hourly');
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      hourlyRate: parseFloat(hourlyRate) || 0,
      calculationMode,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: A4, Cours d'essai..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calculationMode">Mode de calcul</Label>
            <Select
              value={calculationMode}
              onValueChange={(value: 'hourly' | 'fixed') => setCalculationMode(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Horaire (heures × taux)</SelectItem>
                <SelectItem value="fixed">Forfaitaire (montant fixe)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">
              {calculationMode === 'hourly' ? 'Taux horaire (₪)' : 'Montant par défaut (₪)'}
            </Label>
            <Input
              id="hourlyRate"
              type="number"
              step="0.01"
              min="0"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {category ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
