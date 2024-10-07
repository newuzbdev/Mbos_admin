import {useMutation, useQuery} from "@tanstack/react-query";
import {addIncome, deleteIncome, getIncome, updateIncome} from '@/services/income'
import {Income} from "@/types/income.ts";

export const useAddIncome  = () => {
  return useMutation({
    mutationFn: addIncome,
  });
}
export const useGetIncome = () => {
  return useQuery({
    queryKey: ["income"],
    queryFn: () => getIncome(),
  });
}


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