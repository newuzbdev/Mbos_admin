import axiosPrivate from "@/config/api";
import { Clients } from "@/types/clients";
import { IParams } from "@/types/income";

export const addClients = async (data: Clients) => {
  return await axiosPrivate.post("/user", data);
};

export const getClients = async ({
  page = 1,
  limit = 10, 
  search = "",
}: IParams) => {
  return await axiosPrivate.get(
    `/user?limit=${limit}&page=${page}&search=${search}`
  );
};
export const getClientstById = async (clientsId: string) => {
  return await axiosPrivate.get(`/user/${clientsId}`);
};
export const deleteClients = async (id: string) => {
  return await axiosPrivate.delete(`/user/${id}`);
};
export async function updateClients({ id, ...data }: Clients) {
  return await axiosPrivate.patch(`/user/${id}`, data);
}
