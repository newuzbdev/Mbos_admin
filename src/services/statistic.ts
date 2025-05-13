import axiosPrivate from "@/config/api";

export const getStatistic = async () => {
  return await axiosPrivate.get("/dashboard");
};
export const useIncomeDash = async () => {
  return await axiosPrivate.get("/dashboard/income");
};
export const useIncomeStatistik = async () => {
  return await axiosPrivate.get("/dashboard/statstik");
};
export const useIncomeStatistikIncome = async () => {
  return await axiosPrivate.get("/dashboard/statstik-income");
};

export const getServiceDash = async (id: string) => {
  return await axiosPrivate.get(`/dashboard/serviceDash/${id}`);
};
