import type { ExpensesResponse } from "../types/expensesType.tsx";

const token = import.meta.env.VITE_JWT_TOKEN;
const api_url = import.meta.env.VITE_API_URL;

export const getExpenses = async (): Promise<ExpensesResponse> => {
  const response = await fetch(`${api_url}/expenses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
