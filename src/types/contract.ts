import { Clients } from "./clients";
import { Income } from "./income";
import { IService } from "./service";

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
  tolash_sana: string | Date | null;
  total_price: string;
  updated_at: string;
  user_id: number;
};
