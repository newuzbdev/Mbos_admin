import { addMonthlyFee, getMonthlyFee, updateMonthlyFee,  } from "@/services/monthly-fee";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddMonthlyFee = () => {
    return useMutation({
      mutationFn: addMonthlyFee,
    });
  };
  export const useGetMonthlyFee = () => {
    return useQuery({
      queryKey: ["monthly-fee"],
      queryFn: () => getMonthlyFee(),
    });
  };

  export function useMonthlyUpdate() {
    return useMutation({
      mutationFn: (data: any) => updateMonthlyFee(data),
    });
  }