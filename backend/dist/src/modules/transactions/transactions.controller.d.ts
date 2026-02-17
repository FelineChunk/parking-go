import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly service;
    constructor(service: TransactionsService);
    create(dto: CreateTransactionDto): Promise<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: import("../../generated/prisma/enums").transaction_status;
    }>;
    close(id: string): Promise<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: import("../../generated/prisma/enums").transaction_status;
    }>;
    findAll(): Promise<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: import("../../generated/prisma/enums").transaction_status;
    }[]>;
    findOne(id: string): Promise<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: import("../../generated/prisma/enums").transaction_status;
    }>;
}
