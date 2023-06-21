import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async create(name: string, email: string, password: string): Promise<void> {
    // データベースなどにユーザー情報を保存する処理を実装
    await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        name: name,
        email: email,
        password: password,
      },
    });
  }

  async find(email: string, password: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email: email, password: password },
    });
  }

  async findAll(): Promise<User[] | []> {
    return await prisma.user.findMany();
  }
}
