import axiosPrivate from "@/config/api";
import { Contract } from "@/types/contract";
import { IParams } from "@/types/income";

export const addContract = async (data: Contract) => {
  return await axiosPrivate.post("/shartnoma", data);
};
export const contractUpdate = async (data: Contract) => {
  return await axiosPrivate.post("/shartnoma/{id}", data);
};

export const getContract = async ({
  page = 1,
  limit = 10,
  search = "",
  isPaid = "",
  filter = "ASC",
}: IParams) => {
  return await axiosPrivate.get(
    `/shartnoma?page=${page}&limit=${limit}&search=${search}&isPaid=${isPaid}&filter=${
      filter || "ASC"
    }`
  );
};

export const completeContract = async (id: string) => {
  return await axiosPrivate.patch(`/shartnoma/${id}`, {
    enabled: 1,
  });
};

export const getContractById = async (
  contractId: string,
  orderForMonth: "ASC" | "DESC" = "ASC"
) => {
  return await axiosPrivate.get(
    `/shartnoma/${contractId}?orderForMonth=${orderForMonth}`
  );
};
export const deleteContract = async (id: string) => {
  return await axiosPrivate.delete(`/shartnoma/${id}`);
};
export async function updateContract({ id, ...data }: Contract) {
  return await axiosPrivate.patch(`/shartnoma/${id}`, data);
}
