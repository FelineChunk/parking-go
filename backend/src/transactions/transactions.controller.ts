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
  constructor(private readonly transactionsService: TransactionsService) {}

  // GET semua transaksi
  @Get()
  async getAll(): Promise<TransactionModel[]> {
    return this.transactionsService.transactions({
      orderBy: { time_in: "desc" },
    });
  }

  // GET transaksi by id
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.transactionsService.transaction({
      id_transaction: Number(id),
    });
  }

  // kendaraan masuk
  @Post()
  async create(@Body() body: { card_id?: string }) {
    return this.transactionsService.createTransaction({
      card_id: body.card_id,
      status: "IN",
      time_in: new Date(),
    });
  }

  // kendaraan keluar
  @Put(":id/out")
  async checkout(@Param("id") id: string) {
    return this.transactionsService.checkout(Number(id));
  }

  // transaksi selesai
  @Put(":id/done")
  async done(@Param("id") id: string) {
    return this.transactionsService.finishTransaction(Number(id));
  }

  // delete
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.transactionsService.deleteTransaction({
      id_transaction: Number(id),
    });
  }
}