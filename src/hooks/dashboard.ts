import {
  getStatistic,
  useIncomeDash,
  useIncomeStatistik,
  useIncomeStatistikIncome,
} from "@/services/statistic";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();

  const year = searchParams.get("year");

  return useQuery({
    queryKey: ["statistik", year],
    queryFn: () => useIncomeStatistik(year),
  });
};

export const useGetStatistikIncome = () => {
  const [searchParams] = useSearchParams();

  const year = searchParams.get("year");

  return useQuery({
    queryKey: ["statistik-income", year],
    queryFn: () => useIncomeStatistikIncome(year),
  });
};
