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

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "RSD",
  }).format(amount);
};

const formatDate = (dateParam: string) => {
  return new Intl.DateTimeFormat("sr-RS").format(new Date(dateParam));
};

export default function TableComponent({ data, onDelete }) {
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
