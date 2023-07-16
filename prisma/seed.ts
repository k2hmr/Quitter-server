import { PrismaClient } from "@prisma/client";
import { PlatformType } from "../src/domain/theme/platform";
import { PriorityType } from "../src/domain/theme/priority";
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

  const test2 = await prisma.category.create({
    data: {
      name: "test",
      userId: test.id,
    },
  });

  const test3 = await prisma.theme.create({
    data: {
      theme: "test",
      categoryId: test2.id,
      priority: PriorityType.High,
      platform: PlatformType.Note,
      userId: test.id,
    },
  });

  const test4 = await prisma.postTemplate.create({
    data: {
      content: "test",
      themeId: test3.id,
    },
  });

  const test5 = await prisma.message.create({
    data: {
      content: "test",
      postTemplateId: test4.id,
    },
  });

  const test6 = await prisma.feedback.create({
    data: {
      content: "test",
      postTemplateId: test4.id,
    },
  });

  console.log({ test: test, test2: test2, test3: test3, test4: test4, test5: test5, test6: test6 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
