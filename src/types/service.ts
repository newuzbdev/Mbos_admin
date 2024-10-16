import { Contract } from "./contract";

export enum EnumServiceType {
  service = "service",
  product = "product",
  other = "other",
}

export interface IService {
  id: number;
  created_at: string;
  shartnoma: Contract;
  updated_at: string;
  title: string;
  price: number;
  serviceType: EnumServiceType;
}
