// import { columns } from "../components/Table/columns.tsx";
// import { DataTable } from "@/components/Table/data-table";
// import { useExpenses } from "@/hooks/useExpenses";

// export default function Expenses() {
//   const { data, isPending, isError, error } = useExpenses();

//   if (isPending) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="px-4 py-3">
//       <main className="container mx-auto">
//         <DataTable columns={columns} data={data.data} />
//       </main>
//     </div>
//   );
// }

export default function Expenses() {
  return <>Expenses</>;
}
