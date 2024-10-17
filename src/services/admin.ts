import axiosPrivate from "@/config/api";

export async function getAdmin(contractId: number) {
  return await axiosPrivate.get(`/admin/getAdmin/${contractId}`);
}
