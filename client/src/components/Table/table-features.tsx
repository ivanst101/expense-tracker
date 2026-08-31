import type { Expense } from "@/types/expenseType";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  type Row,
} from "@tanstack/react-table";

const sortFn_date = (
  rowA: Row<Expense>,
  rowB: Row<Expense>,
  columnId: string,
) => {
  const dateA = new Date(rowA.getValue<string>(columnId)).getTime();
  const dateB = new Date(rowB.getValue<string>(columnId)).getTime();
  return dateA - dateB;
};

export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    date: sortFn_date,
  },
});

export type DataTableFeatures = typeof features;
