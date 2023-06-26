import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { internalErrorException, notFoundException, unauthorizedException } from "../../exception/error";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(user: { name: string; email: string; password: string }): Promise<void> {
    await prisma.user
      .create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      })
      .catch((error) => {
        throw unauthorizedException(error.message);
      });
  }

  async find(user: { email: string; password: string }): Promise<User> {
    try {
      const account = await prisma.user.findFirst({
        where: { email: user.email, password: user.password },
      });

      const domainUser = new User({
        id: account.id,
        name: account.name,
        email: account.email,
        password: account.password,
        createdAt: account.created_at,
      });
      return domainUser;
    } catch (error) {
      // データが見つからなかった場合
      if (error.statusCode === 404) throw notFoundException(error.message);
      // DB接続エラーなど、サーバー側が悪いエラーの場合
      throw internalErrorException(error.message);
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
