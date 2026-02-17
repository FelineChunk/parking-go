import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService){}

  // 🚗 Mobil masuk
 async create(card_id: string) {
  if (!card_id) throw new BadRequestException('Card ID is required');

  return this.prisma.transactions.create({
    data: { card_id },
  });
}

  // 🚗 Mobil keluar
  async close(id: number) {
    const transaction = await this.prisma.transactions.findUnique({
      where: { id_transaction: id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (transaction.status === 'DONE') {
      throw new BadRequestException('Transaction already closed');
    }

    const time_out = new Date();

    const durationMs =
      time_out.getTime() - transaction.time_in.getTime();

    const durationHours = Math.ceil(durationMs / 3600000);

    const PRICE_PER_HOUR = 2000;
    const fee = durationHours * PRICE_PER_HOUR;

    return this.prisma.transactions.update({
      where: { id_transaction: id },
      data: {
        time_out,
        fee,
        status: 'DONE',
      },
    });
  }

  // 📄 List semua transaksi
  async findAll() {
    return this.prisma.transactions.findMany({
      orderBy: { time_in: 'desc' },
    });
  }

  // 📄 Detail transaksi
  async findOne(id: number) {
    const transaction = await this.prisma.transactions.findUnique({
      where: { id_transaction: id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
