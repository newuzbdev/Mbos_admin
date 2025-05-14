import {
  addClients,
  deleteClients,
  getClients,
  getClientstById,
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

export const useGetClients = (params: {
  page: string | null;
  limit: string | null;
  search: string | null;
}) => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(params),
  });
};

export const useGetClient = (clientsId?: string) => {
  return useQuery({
    queryKey: ["clients", clientsId],
    queryFn: () => {
      if (!clientsId) throw new Error("Contract ID is required");
      return getClientstById(clientsId);
    },
    enabled: !!clientsId,
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
