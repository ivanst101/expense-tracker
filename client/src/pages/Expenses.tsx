import DialogWindow from "@/components/Dialog.tsx";
import { columns } from "../components/Table/columns.tsx";
import { DataTable } from "@/components/Table/data-table";
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

export default function Expenses() {
  const { data, isPending, isError, error } = useCurrentExpenses();
  const deleteExpenseMutation = useDeleteExpense();
  const handleDelete = (id: string) => {
    deleteExpenseMutation.mutate(id);
  };

  const tableColumns = columns(handleDelete);

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
        <DataTable columns={tableColumns} data={data} />
      </main>
    </div>
  );
}
