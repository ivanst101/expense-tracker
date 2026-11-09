import type { Expense } from "@/types/ExpenseType";
import type { ExpenseFormValues } from "@/types/formTypes";

export const updateExpense = async (
  id: string,
  expense: ExpenseFormValues,
): Promise<Expense> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/expenses/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update expense");
  }

  const result = await response.json();

  return result.data.expense;
};
