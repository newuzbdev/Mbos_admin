import {
  addContract,
  deleteContract,
  getContract,
  updateContract,
} from "@/services/contract";
import { Contract } from "@/types/contract";
import { IParams } from "@/types/income";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddContract = () => {
  return useMutation({
    mutationFn: addContract,
  });
};
export const useGetContract = (params: IParams) => {
  return useQuery({
    queryKey: ["contract"],
    queryFn: () => getContract(params),
  });
};

export function useContractDelete() {
  return useMutation({
    mutationFn: (id: string) => deleteContract(id),
  });
}
export function useContractUpdate() {
  return useMutation({
    mutationFn: (data: Contract) => updateContract(data),
  });
}
