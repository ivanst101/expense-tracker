import { columns } from "../components/Table/columns.tsx";
import { DataTable } from "@/components/Table/data-table";
import { useCurrentExpenses, useDeleteExpense } from "@/hooks/useExpenses.ts";

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
      <h3 className="mb-4">Expenses</h3>
      <main className="container mx-auto">
        <DataTable columns={tableColumns} data={data} />
      </main>
    </div>
  );
}
