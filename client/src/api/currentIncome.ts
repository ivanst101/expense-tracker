import type { AddIncomeData, IncomeResponse } from "@/types/incomeType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCurrentIncome() {
  const response = await fetch(`${API_URL}/income/current`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current income");
  }

  return response.json();
}

export async function createIncome(
  income: AddIncomeData,
): Promise<IncomeResponse> {
  const response = await fetch(`${API_URL}/income`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(income),
  });

  if (!response.ok) {
    throw new Error("Failed to create income");
  }

  return response.json();
}

export const useAddIncome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncome,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-income"],
      });
    },
  });
};
