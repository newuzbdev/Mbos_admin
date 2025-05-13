import axiosPrivate from "@/config/api";

export const getStatistic = async (year?: number) => {
  return await axiosPrivate.get(`/dashboard${year ? `?year=${year}` : ""}`);
};
export const useIncomeDash = async () => {
  return await axiosPrivate.get("/dashboard/income");
};
export const useIncomeStatistik = async (year: string) => {
  return await axiosPrivate.get("/dashboard/statstik", { params: { year } });
};
export const useIncomeStatistikIncome = async (year: string) => {
  return await axiosPrivate.get("/dashboard/statstik-income", {
    params: { year },
  });
};

export const getServiceDash = async (id: string) => {
  return await axiosPrivate.get(`/dashboard/serviceDash/${id}`);
};
