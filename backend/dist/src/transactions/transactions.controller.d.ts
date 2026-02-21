import { TransactionsService } from "./transactions.service.js";
import { transactions as TransactionModel } from "../generated/prisma/client.js";
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    getAll(): Promise<TransactionModel[]>;
    getById(id: string): Promise<TransactionModel | null>;
    create(body: {
        card_id?: string;
    }): Promise<TransactionModel>;
    checkout(id: string): Promise<TransactionModel>;
    delete(id: string): Promise<TransactionModel>;
}
