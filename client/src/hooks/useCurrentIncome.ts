import { getCurrentIncome } from "@/api/currentIncome";
import type { IncomeResponse } from "@/types/incomeType";
import { useQuery } from "@tanstack/react-query";

export function useCurrentIncome() {
  return useQuery<IncomeResponse>({
    queryKey: ["current-income"],
    queryFn: getCurrentIncome,
  });
}
