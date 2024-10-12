import {
  addContract,
  deleteContract,
  getContract,
  getContractById,
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
export const useGetContracts = (params: IParams) => {
  return useQuery({
    queryKey: ["contract"],
    queryFn: () => getContract(params),
  });
};
export const useGetContract = (contractId?: string) => {
  return useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => {
      if (!contractId) throw new Error("Contract ID is required");
      return getContractById(contractId);
    },
    enabled: !!contractId, // only run the query if contractId is provided
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
