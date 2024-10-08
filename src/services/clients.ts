import axiosPrivate from "@/config/api";
import { Clients } from "@/types/clients";

export const addClients = async (data: Clients) => {
  return await axiosPrivate.post("/user", data);
};

export const getClients = async () => {
  return await axiosPrivate.get("/user");
};
export const deleteClients = async (id: string) => {
  return await axiosPrivate.delete(`/user/${id}`);
};
export async function updateClients({ id, ...data }: Clients) {
  return await axiosPrivate.patch(`/user/${id}`, data);
}
