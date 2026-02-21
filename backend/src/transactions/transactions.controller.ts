import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";

import { TransactionsService } from "./transactions.service.js";
import { transactions as TransactionModel } from "../generated/prisma/client.js";

@Controller("transactions")
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  // 🔹 GET /transactions
  @Get()
  async getAll(): Promise<TransactionModel[]> {
    return this.transactionsService.transactions({
      orderBy: { time_in: "desc" },
    });
  }

  // 🔹 GET /transactions/:id
  @Get(":id")
  async getById(
    @Param("id") id: string,
  ): Promise<TransactionModel | null> {
    return this.transactionsService.transaction({
      id_transaction: Number(id),
    });
  }

  // 🔹 POST /transactions (kendaraan masuk)
  @Post()
  async create(
    @Body() body: { card_id?: string },
  ): Promise<TransactionModel> {
    return this.transactionsService.createTransaction({
      card_id: body.card_id,
      status: "IN",
    });
  }

  // 🔹 PUT /transactions/:id/out (kendaraan keluar)
  @Put(":id/out")
  async checkout(
    @Param("id") id: string,
  ): Promise<TransactionModel> {
    return this.transactionsService.updateTransaction({
      where: { id_transaction: Number(id) },
      data: {
        time_out: new Date(),
        status: "OUT",
      },
    });
  }

  // 🔹 DELETE /transactions/:id
  @Delete(":id")
  async delete(
    @Param("id") id: string,
  ): Promise<TransactionModel> {
    return this.transactionsService.deleteTransaction({
      id_transaction: Number(id),
    });
  }
}