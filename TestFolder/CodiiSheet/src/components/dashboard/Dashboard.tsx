import { useMemo } from 'react';
import { Entry, Category } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { calculations } from '@/services/calculations';
import { Clock, Wallet } from 'lucide-react';

interface DashboardProps {
  entries: Entry[];
  categories: Category[];
  selectedMonth: string;
}

export function Dashboard({ entries, categories, selectedMonth }: DashboardProps) {
  const monthEntries = useMemo(
    () => calculations.getEntriesByMonth(entries, selectedMonth),
    [entries, selectedMonth]
  );

  const totalHours = useMemo(
    () => calculations.calculateTotalHours(monthEntries),
    [monthEntries]
  );

  const totalRevenue = useMemo(
    () => calculations.calculateTotalRevenue(monthEntries, categories),
    [monthEntries, categories]
  );

  const revenueByCategory = useMemo(
    () => calculations.getRevenueByCategory(monthEntries, categories),
    [monthEntries, categories]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours} h</div>
            <p className="text-xs text-muted-foreground">
              {calculations.formatMonth(selectedMonth)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculations.formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {calculations.formatMonth(selectedMonth)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détail par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          {revenueByCategory.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Aucune donnée pour ce mois.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">Heures</TableHead>
                  <TableHead className="text-right">Revenu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueByCategory.map(({ category, hours, revenue }) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      {category.calculationMode === 'hourly' ? 'Horaire' : 'Forfaitaire'}
                    </TableCell>
                    <TableCell className="text-right">
                      {category.calculationMode === 'hourly' ? `${hours} h` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {calculations.formatCurrency(revenue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">{totalHours} h</TableCell>
                  <TableCell className="text-right font-bold">
                    {calculations.formatCurrency(totalRevenue)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
