var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async transaction(where) {
        return this.prisma.transactions.findUnique({
            where,
        });
    }
    async transactions(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.transactions.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createTransaction(data) {
        return this.prisma.transactions.create({
            data,
        });
    }
    async updateTransaction(params) {
        const { where, data } = params;
        return this.prisma.transactions.update({
            where,
            data,
        });
    }
    async deleteTransaction(where) {
        return this.prisma.transactions.delete({
            where,
        });
    }
};
TransactionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TransactionsService);
export { TransactionsService };
//# sourceMappingURL=transactions.service.js.map