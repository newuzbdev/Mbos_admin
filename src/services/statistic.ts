import axiosPrivate from "@/config/api";

export const getStatistic = async (year?: number) => {
  return await axiosPrivate.get(`/dashboard${year ? `?year=${year}` : ""}`);
};
export const useIncomeDash = async () => {
  return await axiosPrivate.get("/dashboard/income");
};
export const useIncomeStatistik = async () => {
  return await axiosPrivate.get("/dashboard/statstik");
};

export const getServiceDash = async (id: string) => {
  return await axiosPrivate.get(`/dashboard/serviceDash/${id}`);
};
