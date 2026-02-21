var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Put, Delete, Param, Body, } from "@nestjs/common";
import { TransactionsService } from "./transactions.service.js";
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async getAll() {
        return this.transactionsService.transactions({
            orderBy: { time_in: "desc" },
        });
    }
    async getById(id) {
        return this.transactionsService.transaction({
            id_transaction: Number(id),
        });
    }
    async create(body) {
        return this.transactionsService.createTransaction({
            card_id: body.card_id,
            status: "IN",
        });
    }
    async checkout(id) {
        return this.transactionsService.updateTransaction({
            where: { id_transaction: Number(id) },
            data: {
                time_out: new Date(),
                status: "OUT",
            },
        });
    }
    async delete(id) {
        return this.transactionsService.deleteTransaction({
            id_transaction: Number(id),
        });
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getAll", null);
__decorate([
    Get(":id"),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getById", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    Put(":id/out"),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "checkout", null);
__decorate([
    Delete(":id"),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "delete", null);
TransactionsController = __decorate([
    Controller("transactions"),
    __metadata("design:paramtypes", [TransactionsService])
], TransactionsController);
export { TransactionsController };
//# sourceMappingURL=transactions.controller.js.map