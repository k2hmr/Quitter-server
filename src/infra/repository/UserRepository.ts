import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { unauthorizedException } from "../../exception/error";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(name: string, email: string, password: string): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }

  async find(email: string, password: string): Promise<User> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: email, password: password },
      });

      const domainUser = new User(user.id, user.name, user.email, user.password, user.created_at);
      return domainUser;
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    const domainUsers = users.map((user) => {
      return new User(user.id, user.name, user.email, user.password, user.created_at);
    });
    return domainUsers;
  }
}
