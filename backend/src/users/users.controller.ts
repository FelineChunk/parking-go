    import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
    NotFoundException,
    ForbiddenException,
    UseGuards,
    Req,
    } from "@nestjs/common";
    import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
    import type { Request } from "express";
    import { UsersService } from "./users.service.js";
    import { level, Prisma } from "../generated/prisma/client.js";
    import type { auth_users } from "../generated/prisma/client.js";
    import { SupabaseAuthGuard } from "../guards/auth.guard.js";
    import { RolesGuard } from "../guards/roles.guard.js";
    import { Roles } from "../guards/roles.decorator.js";

    @Controller("users")
    @UseGuards(ThrottlerGuard, SupabaseAuthGuard, RolesGuard)
    export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // GET /users — only admin & super
    @Get()
    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Roles(level.admin, level.super)
    async getUsers(
        @Query("skip") skip?: string,
        @Query("take") take?: string,
        @Query("orderBy") orderBy?: string,
    ): Promise<auth_users[]> {
        return this.usersService.users({
        skip: skip ? parseInt(skip) : undefined,
        take: take ? parseInt(take) : undefined,
        orderBy: orderBy
            ? ({ [orderBy]: "asc" } as Prisma.auth_usersOrderByWithRelationInput)
            : undefined,
        });
    }
    // GET /users/me atau /users/profile/:id
    @Get("profile/:id")
    async getPublicUser(@Param("id") id: string) {
        return this.usersService.publicUser(id);  // ← pakai service, bukan this.prisma
    }

    // GET /users/:id — user can only see their own data, admin & super can see all
    @Get(":id")
    @Throttle({ default: { limit: 10, ttl: 60000 } })
    async getUserById(
        @Param("id") id: string,
        @Req() req: Request,
    ): Promise<auth_users> {
        const supabaseUser = (req as any).supabaseUser;
        const userRole: level | undefined = (req as any).userRole;

        const isAdminOrSuper =
        userRole === level.admin || userRole === level.super;

        // Non-admin can only access their own data
        if (!isAdminOrSuper && supabaseUser.id !== id) {
        throw new ForbiddenException("You can only access your own data");
        }

        const user = await this.usersService.user({ id });

        if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    // GET /users/email/:email — user can only see their own data, admin & super can see all
    @Get("email/:email")
    @Throttle({ default: { limit: 10, ttl: 60000 } })
    async getUserByEmail(
        @Param("email") email: string,
        @Req() req: Request,
    ): Promise<auth_users> {
        const supabaseUser = (req as any).supabaseUser;
        const userRole: level | undefined = (req as any).userRole;

        const isAdminOrSuper =
        userRole === level.admin || userRole === level.super;

        // Non-admin can only access their own email
        if (!isAdminOrSuper && supabaseUser.email !== email) {
        throw new ForbiddenException("You can only access your own data");
        }

        const user = await this.usersService.user({ email });

        if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }



    // POST /users — only admin & super
    @Post()
    @Roles(level.admin, level.super)
    async createUser(
        @Body() data: Prisma.auth_usersCreateInput,
    ): Promise<auth_users> {
        return this.usersService.createUser(data);
    }

    // DELETE /users/:id — only admin & super
    @Delete(":id")
    @Roles(level.admin, level.super)
    async deleteUser(@Param("id") id: string): Promise<auth_users> {
        const user = await this.usersService.user({ id });

        if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
        }

        return this.usersService.deleteUser({ id });
    }
    }


