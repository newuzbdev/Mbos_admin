import { getAdmin } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

export const useGetGetAdmin = (contractId: number) => {
  return useQuery({
    queryKey: ["admin", contractId],
    queryFn: () => getAdmin(contractId),
    enabled: !!contractId,
  });
};
