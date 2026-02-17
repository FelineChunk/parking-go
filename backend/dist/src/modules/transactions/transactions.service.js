"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(card_id) {
        if (!card_id)
            throw new common_1.BadRequestException('Card ID is required');
        return this.prisma.transactions.create({
            data: { card_id },
        });
    }
    async close(id) {
        const transaction = await this.prisma.transactions.findUnique({
            where: { id_transaction: id },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        if (transaction.status === 'DONE') {
            throw new common_1.BadRequestException('Transaction already closed');
        }
        const time_out = new Date();
        const durationMs = time_out.getTime() - transaction.time_in.getTime();
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
    async findAll() {
        return this.prisma.transactions.findMany({
            orderBy: { time_in: 'desc' },
        });
    }
    async findOne(id) {
        const transaction = await this.prisma.transactions.findUnique({
            where: { id_transaction: id },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map