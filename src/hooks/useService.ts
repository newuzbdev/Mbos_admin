import {
  addService,
  deleteService,
  getService,
  getServiceById,
  updateService,
} from "@/services/service";
import { getServiceDash } from "@/services/statistic";
import { IParams } from "@/types/income";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddService = () => {
  return useMutation({
    mutationFn: addService,
  });
};
export const useGetServices = (params: IParams) => {
  return useQuery({
    queryKey: ["service"],
    queryFn: () => getService(params),
  });
};
export const useGetService = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => {
      if (!id) throw new Error("Service ID is required");
      return getServiceById(id);
    },
    enabled: !!id,
  });
};

export function useServiceDelete() {
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
  });
}
export function useServiceUpdate() {
  return useMutation({
    mutationFn: (data: any) => updateService(data),
  });
}

export const useGetServiceDash = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => {
      if (!id) throw new Error("Service ID is required");
      return getServiceDash(id);
    },
    enabled: !!id,
  });
};
