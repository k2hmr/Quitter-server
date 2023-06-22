import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { unauthorizedException } from "../../exception/error";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(userInfo: { name: string; email: string; password: string }): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        },
      });
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }

  async find(userInfo: { email: string; password: string }): Promise<User> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: userInfo.email, password: userInfo.password },
      });

      const domainUser = new User({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.created_at,
      });
      return domainUser;
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    const domainUsers = users.map((user) => {
      return new User({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.created_at,
      });
    });
    return domainUsers;
  }
}
