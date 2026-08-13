import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./table-features";
import { type Expense } from "../../types/expensesType";

const columnHelper = createColumnHelper<DataTableFeatures, Expense>();

export const columns = columnHelper.columns([
  columnHelper.accessor("title", { header: "Title" }),
  columnHelper.accessor("amount", { header: "Amount" }),
  columnHelper.accessor("category", { header: "Category" }),
  columnHelper.accessor("date", { header: "Date" }),
]);
