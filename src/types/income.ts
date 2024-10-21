import { Clients } from "./clients";
import { Contract } from "./contract";
import { EnumServiceType } from "./service";

export enum EnumIncamTpeTranslation {
  cash = "Naqt",
  translation = "O'tkazma orqali",
  online = "Online",
  salary = "Oylik",
  delivery = "Yetkazib berish",
  other = "Boshqalar",
}
export enum EnumIncamIsPaid {
  paid = "paid",
  no_paid = "no_paid",
  confirm_payment = "confirm_payment",
}
export type Income = {
  id: string;
  user_id: number;
  amount: number;
  shartnoma: Contract;
  confirm_payment: EnumIncamIsPaid;
  payment_method: EnumIncamTpeTranslation;
  is_paid: EnumIncamIsPaid;
  description: string;
  date: string;
  user: Clients;
  income: number;
};

export interface IParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: EnumServiceType;
  filter?: 'ASC' | 'DESC';
}
