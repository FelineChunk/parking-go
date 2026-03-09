import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module.js';
import { TransactionsModule } from "./transactions/transactions.module.js";
import { UsersModule } from './users/users.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TransactionsModule,
    UsersModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
