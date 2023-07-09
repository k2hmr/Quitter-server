import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const test = await prisma.user.upsert({
    where: { email: "test@email.com" },
    update: {},
    create: {
      name: "test",
      email: "test@email.com",
      password: "test@email.com",
    },
  });

  const test2 = await prisma.user.upsert({
    where: { email: "test2@email.com" },
    update: {},
    create: {
      name: "test2",
      email: "test2@email.com",
      password: "test2@email.com",
    },
  });

  await prisma.theme.create({
    data: {
      theme: "test",
      category: "test",
      priority: "中",
      platform: "test",
      userId: test.id,
    },
  });

  await prisma.theme.create({
    data: {
      theme: "test",
      category: "test",
      priority: "中",
      platform: "test",
      userId: test.id,
    },
  });

  console.log({ test: test, test2: test2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
