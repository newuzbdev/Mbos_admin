import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addIncome,
  deleteIncome,
  getIncome,
  getIncomeProfit,
  updateIncome,
} from "@/services/income";
import {  IParams } from "@/types/income.ts";

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
export const useGetIncomeProfit = (params: IParams) => {
  return useQuery({
    queryKey: ["incomeProfit"],
    queryFn: () => getIncomeProfit(params),
  });
};

export function useIncomeDelete() {
  return useMutation({
    mutationFn: (id: string) => deleteIncome(id),
  });
}
export function useIncomeUpdate() {
  return useMutation({
    mutationFn: (data: any) => updateIncome(data),
  });
}
