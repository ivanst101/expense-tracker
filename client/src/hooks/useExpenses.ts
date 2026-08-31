import type { Expense, ExpenseResponse } from "@/types/expenseType";
import type { ExpenseFormValues } from "@/types/formTypes";
import type { StatsResponse } from "@/types/statsType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(`${API_URL}/expenses`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users expenses!");
  }

  const result: ExpenseResponse = await response.json();
  return result.data;
};

export const useCurrentExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getCurrentExpenses,
  });
};

export const getUserStats = async (): Promise<StatsResponse["data"]> => {
  const response = await fetch(`${API_URL}/expenses/dashboard`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users expenses!");
  }

  const result: StatsResponse = await response.json();
  return result.data;
};

export const useCurrentStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getUserStats,
  });
};

export const addExpense = async (
  expense: ExpenseFormValues,
): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    throw new Error("Failed to add expense");
  }

  const result = await response.json();

  return result.data;
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};
