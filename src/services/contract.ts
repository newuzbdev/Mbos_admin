import axiosPrivate from "@/config/api";
import { Contract } from "@/types/contract";
import { IParams } from "@/types/income";

export const addContract = async (data: Contract) => {
  return await axiosPrivate.post("/shartnoma", data);
};

export const getContract = async ({
  page = 1,
  limit = 10,
  search = "",
}: IParams) => {
  return await axiosPrivate.get(
    `/shartnoma?page=${page}&limit=${limit}&search=${search}`
  );
};
export const deleteContract = async (id: string) => {
  return await axiosPrivate.delete(`/shartnoma/${id}`);
};
export async function updateContract({ id, ...data }: Contract) {
  return await axiosPrivate.patch(`/shartnoma/${id}`, data);
}
