import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { auth_users, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    where: Prisma.auth_usersWhereUniqueInput,
  ): Promise<auth_users | null> {
    return this.prisma.auth_users.findUnique({
      where,
      
    });
  }

  async publicUser(id: string) {
  return this.prisma.public_users.findUnique({
    where: { id_user: id }
  });
}
 
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.auth_usersWhereUniqueInput;
    where?: Prisma.auth_usersWhereInput;
    orderBy?: Prisma.auth_usersOrderByWithRelationInput;
  }): Promise<auth_users[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.auth_users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // 🔹 Create new user
  async createUser(
    data: Prisma.auth_usersCreateInput,
  ): Promise<auth_users> {
    return this.prisma.auth_users.create({
      data,
    });
  }


  // 🔹 Delete user
  async deleteUser(
    where: Prisma.auth_usersWhereUniqueInput,
  ): Promise<auth_users> {
    return this.prisma.auth_users.delete({
      where,
    });
  }
}