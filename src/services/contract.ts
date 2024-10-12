import axiosPrivate from "@/config/api";
import { Contract } from "@/types/contract";

export const addContract = async (data: Contract) => {
  return await axiosPrivate.post("/shartnoma", data);
};

export const getContract = async (id:string) => {
  return await axiosPrivate.get(`/shartnoma/${id}`);
};
export const deleteContract = async (id: string) => {
  return await axiosPrivate.delete(`/shartnoma/${id}`);
};
export async function updateContract({ id, ...data }: Contract) {
  return await axiosPrivate.patch(`/shartnoma/${id}`, data);
}
