import axiosPrivate from "@/config/api";
import { IParams } from "@/types/income";
import { EnumServiceType, IService } from "@/types/service";

export const addService = async (data: IService) => {
  return await axiosPrivate.post("/service", data);
};

export const getService = async ({
  page = 1,
  limit = 10,
  search = "",
  type = EnumServiceType.service,
}: IParams) => {
  return await axiosPrivate.get(
    `/service?page=${page}&limit=${limit}&search=${search}&type=${type}`
  );
};
export const getServiceById = async (id: string) => {
  return await axiosPrivate.get(`/service/${id}`);
};
export const deleteService = async (id: string) => {
  return await axiosPrivate.delete(`/service/${id}`);
};
export async function updateService({ id, ...data }: IService) {
  return await axiosPrivate.patch(`/service/${id}`, data);
}
