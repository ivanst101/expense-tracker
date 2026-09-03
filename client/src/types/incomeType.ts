export interface Income {
  _id: string;
  amount: number;
  month: number;
  year: number;
  user: string;
}

export interface IncomeResponse {
  status: string;
  data: {
    income: Income | null;
  };
}

export interface AddIncomeData {
  amount: number;
}
