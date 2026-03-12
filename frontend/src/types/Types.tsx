export interface Transactions {
  id_transaction: number;
  time_in: string;
  time_out: string | null;
  fee: number | null;
  card_id: number | null;
  duration: number | null;
  status: string;
}