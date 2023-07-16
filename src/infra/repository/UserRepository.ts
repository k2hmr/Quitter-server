import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { internalErrorException, notFoundException, unauthorizedException } from "../../exception/error";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(name: string, email: string, password: string): Promise<User> {
    const createdUser = await prisma.user
      .create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      })
      .catch((error) => {
        throw unauthorizedException(error.message);
      });

    const domainUser = new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.createdAt
    );

    return domainUser;
  }

  async find(email: string, password: string): Promise<User> {
    try {
      const account = await prisma.user.findFirst({
        where: { email: email, password: password },
      });

      const domainUser = new User(account.id, account.name, account.email, account.password, account.createdAt);
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
    return users.map((user) => {
      return new User(user.id, user.name, user.email, user.password, user.createdAt);
    });
  }
}
