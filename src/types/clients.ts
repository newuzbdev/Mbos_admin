import { Contract } from "./contract";
import { Income } from "./income";

export type Clients = {
  id: number;
  F_I_O: string;
  phone: number;
  adress: string;
  shartnome?: Contract[];
  income?: Income[];
};
