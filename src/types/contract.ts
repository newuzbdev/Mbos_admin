import { Clients } from "./clients";
import { Income } from "./income";

export enum EnumShartnoma {
  subscription_fee = "subscription_fee",
  one_bay = "one_bay",
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
  user: Clients;
  count: number;
  created_at: string;
  income: Income;
  id: number;
  izoh: string;
  price: number;
  advancePayment: number;
  remainingPayment: number;
  purchase_status: EnumShartnomaPaid;
  sana: string;
  service: string;
  shartnoma_id: string;
  shartnoma_muddati: string;
  shartnoma_turi: EnumShartnomaTranslaton;
  texnik_muddati: string;
  tolash_sana: string | null;
  total_price: string;
  updated_at: string;
  user_id: number;
};
