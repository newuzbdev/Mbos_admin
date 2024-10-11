import {Income} from "@/types/income";
import axiosPrivate from "@/config/api";

export const addIncome =  async (data: Income) => {
  return await axiosPrivate.post('/income', data)
}
export const getIncome = async () => {
  return await axiosPrivate.get('/income')
}
export const deleteIncome = async (id: string) => {
  return await axiosPrivate.delete(`/income/${id}`)
}
export async function updateIncome({ id, ...data }: Income) {
  return await axiosPrivate.patch(`/income/${id}`, data);
}
export enum EnumIncamTpeTranslation {
  cash = 'Naqt',
  translation = "O'tkazma orqali",
  online = 'Online',
  salary = 'Oylik',
  delivery = 'Yetkazib berish',
  other = 'Boshqalar',
}