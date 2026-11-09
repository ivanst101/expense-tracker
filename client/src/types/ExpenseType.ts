export type Expense = {
  _id: string;
  id: number;
  title: string;
  amount: number;
  category: string;
  note: string;
  date?: string;
  updatedAt?: string;
};

export type ExpenseResponse = {
  status: string;
  results: number;
  totalResults: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Expense[];
};
