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

  // kendaraan keluar (OUT)
async checkout(id: number): Promise<transactions> {
  const trx = await this.prisma.transactions.findUnique({
    where: { id_transaction: id },
  });

  if (!trx) {
    throw new Error("Transaction not found");
  }

  if (trx.status !== "IN") {
    throw new Error("Vehicle already checked out");
  }

  const now = new Date();

  const duration = Math.floor(
    (now.getTime() - trx.time_in.getTime()) / 60000
  );

  const fee = Math.ceil(duration / 60) * 3000;

  return this.prisma.transactions.update({
    where: { id_transaction: id },
    data: {
      time_out: now,
      duration,
      fee,
      status: "OUT",
    },
  });
}

async finishTransaction(id: number): Promise<transactions> {
  const trx = await this.prisma.transactions.findUnique({
    where: { id_transaction: id },
  });

  if (!trx) {
    throw new Error("Transaction not found");
  }

  if (trx.status !== "OUT") {
    throw new Error("Transaction must be OUT first");
  }

  return this.prisma.transactions.update({
    where: { id_transaction: id },
    data: {
      status: "DONE",
    },
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