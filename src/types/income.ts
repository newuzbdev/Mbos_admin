export type Income = {
  id: string;
  amount: number;
  payment_method: string;
  is_paid: string;
  description: string;
  date: string;
};

export interface IParams {
  page?: number;
  limit?: number;
  search?: string;
}
