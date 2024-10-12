import {
  getStatistic,
  useIncomeDash,
  useIncomeStatistik,
} from "@/services/statistic";
import { useQuery } from "@tanstack/react-query";

export const useGetStatistic = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getStatistic(),
  });
};

export const useGetIncomeDash = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => useIncomeDash(),
  });
};

export const useGetStatistik = () => {
  return useQuery({
    queryKey: ["statistik"],
    queryFn: () => useIncomeStatistik(),
  });
};
