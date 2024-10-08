export enum EnumShartnoma {
  subscription_fee = "subscription_fee",
  one_bay = "one_bay",
}

export enum EnumShartnomaPaid {
  paid = "paid",
  no_paid = "no_paid",
}

export type Contract = {
  count: number;
  created_at: string;
  id: number;
  izoh: string;
  price: string;
  purchase_status: EnumShartnomaPaid;
  sana: string;
  service: string;
  shartnoma_id: string;
  shartnoma_muddati: string;
  shartnoma_turi: EnumShartnoma;
  texnik_muddati: string;
  tolash_sana: string | null;
  total_price: string;
  updated_at: string;
};
