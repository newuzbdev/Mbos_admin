import { Clients } from "./clients";

export enum EnumIncamTpeTranslation {
  cash = "Naqt",
  translation = "O'tkazma orqali",
  online = "Online",
  salary = "Oylik",
  delivery = "Yetkazib berish",
  other = "Boshqalar",
}

export type Income = {
  id: string;
  user_id: number;
  amount: number;
  payment_method: string;
  is_paid: string;
  description: string;
  date: string;
  user: Clients;
  income:number
};

export interface IParams {
  page?: number;
  limit?: number;
  search?: string;
}
