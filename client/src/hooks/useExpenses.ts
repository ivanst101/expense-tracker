import { updateExpense } from "@/api/updateExpense";
import type { Expense, ExpenseResponse } from "@/types/ExpenseType";
import type { ExpenseFormValues } from "@/types/formTypes";
import type { StatsResponse } from "@/types/statsType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export const getCurrentExpenses = async (
  page: number,
): Promise<ExpenseResponse> => {
  const response = await fetch(`${API_URL}/expenses?page=${page}&limit=10`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users expenses!");
  }

  const result: ExpenseResponse = await response.json();
  return result;
};

export const useCurrentExpenses = (page: number) => {
  return useQuery({
    queryKey: ["expenses", page],
    queryFn: () => getCurrentExpenses(page),
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

      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
  });
};

export const deleteExpense = async (id: string) => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
};

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, expense }: { id: string; expense: ExpenseFormValues }) =>
      updateExpense(id, expense),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["stats"],
      });
    },
  });
};
