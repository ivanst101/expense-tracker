export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date;
  updatedAt: Date;
}

export interface ExpensesResponse {
  status: string;
  results: number;
  data: Expense[];
}
