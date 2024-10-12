import {
  addContract,
  deleteContract,
  getContract,
  updateContract,
} from "@/services/contract";
import { Contract } from "@/types/contract";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddContract = () => {
  return useMutation({
    mutationFn: addContract,
  });
};
export const useGetContract = (id: string) => {
  return useQuery({
    queryKey: ["contract",id],
    queryFn: () => getContract(id),
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
