export type Expense = {
  _id: string;
  id: number;
  title: string;
  amount: number;
  category: string;
  date?: string;
  updatedAt?: string;
};

export type ExpenseResponse = {
  status: string;
  results: number;
  data: Expense[];
};
