import {
  addClients,
  deleteClients,
  getClients,
  updateClients,
} from "@/services/clients";
import { Clients } from "@/types/clients";
import { IParams } from "@/types/income";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddClients = () => {
  return useMutation({
    mutationFn: addClients,
  });
};

export const useGetClients = (params: IParams) => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(params),
  });
};

export function useClientsDelete() {
  return useMutation({
    mutationFn: (id: string) => deleteClients(id),
  });
}
export function useClientsUpdate() {
  return useMutation({
    mutationFn: (data: Clients) => updateClients(data),
  });
}
