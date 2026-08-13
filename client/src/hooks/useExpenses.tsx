import { getExpenses } from "@/api/apiExpenses";
import { useQuery } from "@tanstack/react-query";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
}
