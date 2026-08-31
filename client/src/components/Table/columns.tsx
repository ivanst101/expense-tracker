import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./table-features";
import { type Expense } from "../../types/expenseType";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Expense>();

export const columns = (onDelete: (id: string) => void) =>
  columnHelper.columns([
    columnHelper.accessor("date", {
      header: ({ column }) => {
        const sorted = column.getIsSorted();

        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(sorted === "asc")}
          >
            Date
            {sorted === "asc" ? (
              <ArrowUp className="ml-1 h-4 w-4" />
            ) : sorted === "desc" ? (
              <ArrowDown className="ml-1 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        );
      },

      sortFn: "date",

      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return <div>{new Intl.DateTimeFormat("sr-RS").format(date)}</div>;
      },
    }),

    columnHelper.accessor("title", {
      header: "Title",
    }),

    columnHelper.accessor("category", {
      header: "Category",
    }),

    columnHelper.accessor("amount", {
      header: () => <div className="text-right">Amount</div>,

      cell: ({ row }) => {
        const amount = Number(row.getValue("amount"));

        const formatted = new Intl.NumberFormat(navigator.language, {
          style: "currency",
          currency: "RSD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    }),

    columnHelper.display({
      id: "actions",
      header: () => <div className="text-right mr-3">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Button onClick={() => onDelete(row.original._id)}>Delete</Button>
          </div>
        );
      },
    }),
  ]);
