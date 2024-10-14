export type Clients = {
  id: string;
  F_I_O: string;
  phone: number;
  adress: string;
};

export type Income = {
  id: string;
  user_id: number;
  amount: number;
  payment_method: string;
  is_paid: string;
  description: string;
  date: string;
  user:Clients
};

export interface IParams {
  page?: number;
  limit?: number;
  search?: string;
}
