import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./table-features";
import { type Expense } from "../../types/expensesType";

const columnHelper = createColumnHelper<DataTableFeatures, Expense>();

export const columns = columnHelper.columns([
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = new Intl.DateTimeFormat("sr-RS").format(date);
      return <div>{formatted}</div>;
    },
  }),
  columnHelper.accessor("title", { header: "Title" }),
  columnHelper.accessor("category", { header: "Category" }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "RSD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  }),
]);
