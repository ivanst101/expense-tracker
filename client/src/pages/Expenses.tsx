import { columns } from "../components/Table/columns.tsx";
import { DataTable } from "@/components/Table/data-table";
import { useCurrentExpenses } from "@/hooks/useExpenses.ts";

export default function Expenses() {
  const { data, isPending, isError, error } = useCurrentExpenses();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="px-4 py-3">
      <main className="container mx-auto">
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}
