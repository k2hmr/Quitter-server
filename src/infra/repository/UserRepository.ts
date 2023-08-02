import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { internalErrorException, notFoundException, unauthorizedException } from "../../exception/error";
import { UserId } from "../../domain/user/UserId";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(user: { name: string; email: string; password: string }): Promise<User> {
    const createdUser = await prisma.user
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

    const domainUser = User.construct({
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      createdAt: createdUser.createdAt,
    });

    return domainUser;
  }

  async find(user: { email: string; password: string }): Promise<User> {
    try {
      const account = await prisma.user.findFirst({
        where: { email: user.email, password: user.password },
      });

      const domainUser = User.reConstruct(
        { name: account.name, email: account.email, password: account.password, createdAt: account.createdAt },
        account.id
      );
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
      return User.reConstruct(
        { name: user.name, email: user.email, password: user.password, createdAt: user.createdAt },
        user.id
      );
    });
  }

  async exists(id: UserId): Promise<boolean> {
    const user = await prisma.user.findFirst({ where: { id: id.toString() } });
    return user !== null;
  }
}
