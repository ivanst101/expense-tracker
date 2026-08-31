export type totalByMonths = {
  month: string;
  totalAmount: number;
};

export type totalByCategory = {
  totalAmountByCategory: number;
  category: string;
};

export type StatsResponse = {
  status: string;
  data: {
    previousMonths: totalByMonths[];
    totalsCategory: totalByCategory[];
  };
};
