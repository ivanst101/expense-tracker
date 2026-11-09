import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import DialogWindow from "./Dialog";
import type { Expense } from "@/types/ExpenseType";

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "RSD",
  }).format(amount);
};

const formatDate = (dateParam?: string) => {
  if (!dateParam) return "-";
  return new Intl.DateTimeFormat("sr-RS").format(new Date(dateParam));
};

interface TableComponentProps {
  data: Expense[];
  onDelete: (id: string) => void;
}

export default function TableComponent({
  data,
  onDelete,
}: TableComponentProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-52">Date</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length == 0 && (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No expenses for this month
            </TableCell>
          </TableRow>
        )}
        {data.map((expense) => (
          <TableRow key={expense._id}>
            <TableCell>{formatDate(expense.date)}</TableCell>
            <TableCell>{expense.title}</TableCell>
            <TableCell>
              {expense.category.charAt(0).toUpperCase() +
                expense.category.slice(1)}
            </TableCell>
            <TableCell>{expense.note}</TableCell>
            <TableCell>{formatAmount(expense.amount)}</TableCell>
            <TableCell className="text-center flex justify-center gap-3">
              <Button
                variant="destructive"
                onClick={() => onDelete(expense._id)}
              >
                Delete
              </Button>
              <DialogWindow expense={expense} button={<Button>Edit</Button>} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
