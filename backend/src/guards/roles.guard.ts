import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "../prisma.service.js";
import { level } from "../generated/prisma/client.js";
import { ROLES_KEY } from "./roles.decorator.js";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<level[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles required, allow access (auth guard already verified login)
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const supabaseUser = (request as any).supabaseUser;

    if (!supabaseUser) {
      throw new ForbiddenException("User not authenticated");
    }

    // Fetch role from public.users table
    const publicUser = await this.prisma.public_users.findUnique({
      where: { id_user: supabaseUser.id },
      select: { role: true },
    });

    if (!publicUser || !publicUser.role) {
      throw new ForbiddenException("User role not found");
    }

    const hasRole = requiredRoles.includes(publicUser.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${requiredRoles.join(", ")}`,
      );
    }

    // Attach role to request for use in controllers
    (request as any).userRole = publicUser.role;

    return true;
  }
}