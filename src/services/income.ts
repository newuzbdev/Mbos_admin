import { Income, IParams } from "@/types/income";
import axiosPrivate from "@/config/api";

export const addIncome = async (data: Income) => {
  return await axiosPrivate.post("/income", data);
};
export const getIncome = async ({ page = 1, limit = 10 }: IParams) => {
  return await axiosPrivate.get(`/income?page=${page}&limit=${limit}`);
};
export const deleteIncome = async (id: string) => {
  return await axiosPrivate.delete(`/income/${id}`);
};
export async function updateIncome({ id, ...data }: Income) {
  return await axiosPrivate.patch(`/income/${id}`, data);
}
