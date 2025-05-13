import {
  getStatistic,
  useIncomeDash,
  useIncomeStatistik,
  useIncomeStatistikIncome,
} from "@/services/statistic";
import { useQuery } from "@tanstack/react-query";

export const useGetStatistic = (year?: number) => {
  return useQuery({
    queryKey: ["statistiks", year],
    queryFn: () => getStatistic(year),
  });
};

export const useGetIncomeDash = () => {
  return useQuery({
    queryKey: ["incomeDash"],
    queryFn: () => useIncomeDash(),
  });
};

export const useGetStatistik = () => {
  return useQuery({
    queryKey: ["statistik"],
    queryFn: () => useIncomeStatistik(),
  });
};

export const useGetStatistikIncome = () => {
  return useQuery({
    queryKey: ["statistik"],
    queryFn: () => useIncomeStatistikIncome(),
  });
};
