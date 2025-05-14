import axiosPrivate from "@/config/api";
import { Clients } from "@/types/clients";

export const addClients = async (data: Clients) => {
  return await axiosPrivate.post("/user", data);
};

export const getClients = async ({
  page = "1",
  limit = "10",
  search = "",
}: {
  page?: string | null;
  limit?: string | null;
  search?: string | null;
}) => {
  return await axiosPrivate.get(`/user`, { params: { page, limit, search } });
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
