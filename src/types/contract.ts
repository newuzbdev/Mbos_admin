export enum EnumShartnoma {
  subscription_fee = "subscription_fee",
  one_bay = "one_bay",
}

export enum EnumShartnomaPaid {
  paid = "paid",
  no_paid = "no_paid",
}
export type Clients = {
  id: string;
  F_I_O: string;
  phone: number;
  adress: string;
};

export type Contract = {
  user: Clients;
  count: number;
  created_at: string;
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
  shartnoma_turi: string;
  texnik_muddati: string;
  tolash_sana: string | null;
  total_price: string;
  updated_at: string;
  user_id: number;
};
export type RecentSale = {
  user: string
  amount: string;
  name: string
}