import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(name: string, email: string, password: string): Promise<void> {
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

  async getUser(email: string, password: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email: email, password: password },
    });
  }

  async getAllUser(): Promise<User[] | null> {
    return await prisma.user.findMany();
  }
}
