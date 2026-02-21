import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { transactions, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async transaction(
    where: Prisma.transactionsWhereUniqueInput,
  ): Promise<transactions | null> {
    return this.prisma.transactions.findUnique({
      where,
    });
  }

 
  async transactions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.transactionsWhereUniqueInput;
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput;
  }): Promise<transactions[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.transactions.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // 🔹 Create new transaction (kendaraan masuk)
  async createTransaction(
    data: Prisma.transactionsCreateInput,
  ): Promise<transactions> {
    return this.prisma.transactions.create({
      data,
    });
  }

  // 🔹 Update transaction (misalnya set time_out & status OUT/DONE)
  async updateTransaction(params: {
    where: Prisma.transactionsWhereUniqueInput;
    data: Prisma.transactionsUpdateInput;
  }): Promise<transactions> {
    const { where, data } = params;

    return this.prisma.transactions.update({
      where,
      data,
    });
  }

  // 🔹 Delete transaction
  async deleteTransaction(
    where: Prisma.transactionsWhereUniqueInput,
  ): Promise<transactions> {
    return this.prisma.transactions.delete({
      where,
    });
  }
}