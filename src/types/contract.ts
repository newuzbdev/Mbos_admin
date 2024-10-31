import { Clients } from "./clients";
import { Income } from "./income";
import { IService } from "./service";

export enum EnumShartnoma {
  subscription_fee = "subscription_fee",
  one_bay = "one_bay",
}
export enum EnumShartnomeTpeTranslation {
  cash = 'cash',
  translation = 'translation',
  online = 'online',
}

export enum EnumShartnomaTranslaton {
  cash = "Naqt",
  translation = "O'tkazma orqali",
  online = "Online",
  other = "other",
}

export enum EnumShartnomaPaid {
  paid = "paid",
  no_paid = "no_paid",
}

export type Contract = {
  monthlyFee:MonthlyFee
  user: Clients;
  count: number;
  created_at: string;
  payment_method:EnumShartnomeTpeTranslation,
  income: Income;
  id: number;
  izoh: string;
  advancePayment: number;
  remainingPayment: number;
  purchase_status: EnumShartnomaPaid;
  sana: string;
  service: IService;
  whoCreated: string;
  whoUpdated: string;
  service_id: string;
  shartnoma_id: string;
  shartnoma_muddati: string;
  shartnoma_turi: EnumShartnomaTranslaton;
  texnik_muddati: string;
  tolash_sana: Date
  total_price: string;
  updated_at: string;
  user_id: number;
  price: number;
};

export type MonthlyFee ={
  id: number;
  amount: string;
  paid: number;
  date: string;
}