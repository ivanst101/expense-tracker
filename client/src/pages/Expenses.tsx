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
import { useState } from "react";

export default function Expenses() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useCurrentExpenses(page);
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

  const totalPages = Math.ceil(data.totalResults / data.limit);

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
        <TableComponent data={data.data} onDelete={handleDelete} />
        <div className="flex items-center justify-center gap-4 py-4">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
}
