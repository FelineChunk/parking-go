import { SetMetadata } from "@nestjs/common";
import { level } from "../generated/prisma/client.js";

export const ROLES_KEY = "roles";
export const Roles = (...roles: level[]) => SetMetadata(ROLES_KEY, roles);
