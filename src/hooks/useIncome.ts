import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addIncome,
  deleteIncome,
  getIncome,
  updateIncome,
} from "@/services/income";
import { Income, IParams } from "@/types/income.ts";

export const useAddIncome = () => {
  return useMutation({
    mutationFn: addIncome,
  });
};
export const useGetIncome = (params: IParams) => {
  return useQuery({
    queryKey: ["income"],
    queryFn: () => getIncome(params),
  });
};

export function useIncomeDelete() {
  return useMutation({
    mutationFn: (id: string) => deleteIncome(id),
  });
}
export function useIncomeUpdate() {
  return useMutation({
    mutationFn: (data: Income) => updateIncome(data),
  });
}
