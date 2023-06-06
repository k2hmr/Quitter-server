import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const test = await prisma.user.upsert({
    where: { email: "test@email.com" },
    update: {},
    create: {
      email: "test@email.com",
      name: "test",
    },
  });

  const test2 = await prisma.user.upsert({
    where: { email: "test2@email.com" },
    update: {},
    create: {
      email: "test2@email.com",
      name: "test2",
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
