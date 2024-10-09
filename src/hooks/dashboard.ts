import { getStatistic } from "@/services/statistic";
import { useQuery } from "@tanstack/react-query"

export const useGetStatistic = () => {
    return useQuery({
      queryKey: ["clients"],
      queryFn: () => getStatistic(),
    });
  };