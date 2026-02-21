import { PrismaService } from "../prisma.service.js";
import { transactions, Prisma } from "../generated/prisma/client.js";
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    transaction(where: Prisma.transactionsWhereUniqueInput): Promise<transactions | null>;
    transactions(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.transactionsWhereUniqueInput;
        where?: Prisma.transactionsWhereInput;
        orderBy?: Prisma.transactionsOrderByWithRelationInput;
    }): Promise<transactions[]>;
    createTransaction(data: Prisma.transactionsCreateInput): Promise<transactions>;
    updateTransaction(params: {
        where: Prisma.transactionsWhereUniqueInput;
        data: Prisma.transactionsUpdateInput;
    }): Promise<transactions>;
    deleteTransaction(where: Prisma.transactionsWhereUniqueInput): Promise<transactions>;
}
