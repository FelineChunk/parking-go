import { PrismaService } from '@/prisma/prisma.service';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(card_id: string): Promise<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: import("../../generated/prisma/enums").transaction_status;
    }>;
    close(id: number): Promise<{
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
    findOne(id: number): Promise<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: import("../../generated/prisma/enums").transaction_status;
    }>;
}
