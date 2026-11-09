import DialogWindow from "@/components/Dialog.tsx";
import TableComponent from "../components/Table.tsx";
import { useCurrentExpenses, useDeleteExpense } from "@/hooks/useExpenses.ts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useState } from "react";

export default function Expenses() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, refetch } = useCurrentExpenses(
    page,
    month,
  );
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.page ?? 1;
  const deleteExpenseMutation = useDeleteExpense();
  const handleDelete = (id: string) => {
    deleteExpenseMutation.mutate(id);
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="px-4 py-3">
      <Item className="flex items-center">
        <ItemContent className="flex-1">
          <ItemTitle className="text-4xl sm:text-2xl text-heading-one font-semibold">
            Add New Expense
          </ItemTitle>
          <ItemDescription>
            Log a new transaction to your account.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <DialogWindow
            button={
              <Button
                variant="outline"
                className="bg-linear-to-r from-gradient-white-green to-gradient-solid-green text-white cursor-pointer hover:scale-105"
              >
                <Plus /> Quick Add
              </Button>
            }
          />
        </ItemActions>
      </Item>
      <main className="container mx-auto">
        <div className="flex flex-wrap items-center gap-3 py-4 ml-3">
          <Label htmlFor="expense-month">Month</Label>

          <Input
            id="expense-month"
            type="month"
            className="w-auto"
            min="1000-01"
            max="9999-12"
            value={month}
            onChange={(event) => {
              const value = event.target.value;
              if (/^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(value)) {
                setMonth(value);
                setPage(1);
              }
            }}
          />
        </div>
        {deleteExpenseMutation.isError && (
          <p role="alert">Unable to delete expense. Please try again</p>
        )}

        {isPending ? (
          <p role="status">Loading expenses...</p>
        ) : isError ? (
          <div role="alert">
            <p>{error.message}</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        ) : (
          <>
            <TableComponent data={data.data} onDelete={handleDelete} />
            <div className="flex items-center justify-center gap-4 py-4">
              <Button
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}{" "}
              </span>
              <Button
                disabled={currentPage >= totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
