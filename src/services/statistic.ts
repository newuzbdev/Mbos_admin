import axiosPrivate from "@/config/api";

export const getStatistic = async () => {
  return await axiosPrivate.get("/dashboard");
};
export const useIncomeDash = async () => {
  return await axiosPrivate.get("/dashboard/income");
};
