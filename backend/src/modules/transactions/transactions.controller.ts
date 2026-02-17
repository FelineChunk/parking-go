import {
  Controller,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  // 🚗 Masuk
  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto.card_id);
  }

  // 🚗 Keluar
  @Post(':id/close')
  close(@Param('id') id: string) {
    return this.service.close(Number(id));
  }

  // 📄 List semua
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 📄 Detail
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
}
