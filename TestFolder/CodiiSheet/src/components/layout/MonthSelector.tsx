import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calculations } from '@/services/calculations';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
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

  const options = monthOptions();
  const currentIndex = options.findIndex((opt) => opt.value === selectedMonth);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onMonthChange(options[currentIndex - 1].value);
    }
  };

  const handleNext = () => {
    if (currentIndex < options.length - 1) {
      onMonthChange(options[currentIndex + 1].value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentIndex <= 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue>{calculations.formatMonth(selectedMonth)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentIndex >= options.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
