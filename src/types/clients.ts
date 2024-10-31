import { Contract } from "./contract";
import { Income } from "./income";

export type Clients = {
  id: number;
  F_I_O: string;
  phone: number;
  adress: string;
  INN_number: string
  shartnome?: Contract[];
  balance?: number;
  balance_history?: BalanceHistory[];
  income?: Income[];
};
export type BalanceHistory = {
  balance: number;
  id: number;
  amount: number;
  date: string;
  purchase_status: string;
  created_at: string;
  updated_at: string;
  isDeleted: number;
  whoCreated: string | null;
  whoUpdated: string | null;
}