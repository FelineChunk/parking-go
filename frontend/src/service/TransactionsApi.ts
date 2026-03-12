import api from "./Api";
import { Transactions } from "../types/Types";

export const getTransactions = () => {
  return api.get<Transactions[]>("/transactions");
};

export const updateTransaction = async (item: Transactions) => {
  switch (item.status) {
    case "OUT":
      return api.put(`/transactions/${item.id_transaction}/out`);

    case "DONE":
      return api.put(`/transactions/${item.id_transaction}/done`);

    default:
      return Promise.resolve();
  }
};