import { PrismaClient } from "@prisma/client";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { internalErrorException, notFoundException } from "../../exception/error";
import { IPriority, Priority, PriorityType } from "../../domain/theme/priority";
import { IPlatform, Platform, PlatformType } from "../../domain/theme/platform";
import { ThemeId } from "../../domain/theme/ThemeId";
import { UserId } from "../../domain/user/UserId";
import { CategoryId } from "../../domain/category/CategoryId";

const prisma = new PrismaClient();
const convertToVOType = (
  priorityInputValue: number,
  platformInputValue: number
): { priority: PriorityType; platform: PlatformType } => {
  const priorityDataVal: IPriority = { priority: priorityInputValue as PriorityType };
  const _priority = Priority.create(priorityDataVal).priority;
  const platformDataVal: IPlatform = { platform: platformInputValue as PlatformType };
  const _platform = Platform.create(platformDataVal).platform;

  return { priority: _priority, platform: _platform };
};
export class ThemeRepository implements IThemeRepository {
  async create(theme: Theme): Promise<Theme> {
    const createdTheme = await prisma.theme
      .create({
        data: {
          theme: theme.theme,
          categoryId: theme.categoryId.toString(),
          priority: theme.priority,
          platform: theme.platform,
          userId: theme.userId.toString(),
        },
      })
      .catch((error) => {
        throw internalErrorException(error.message);
      });

    const converted = convertToVOType(createdTheme.priority, createdTheme.platform);

    const domainTheme = Theme.construct({
      theme: createdTheme.theme,
      categoryId: CategoryId.reConstruct(createdTheme.categoryId),
      priority: converted.priority,
      platform: converted.platform,
      createdAt: createdTheme.createdAt,
      userId: UserId.reConstruct(createdTheme.userId),
    });

    return domainTheme;
  }

  async find(id: ThemeId, userId: UserId): Promise<Theme> {
    try {
      const targetTheme = await prisma.theme.findFirst({
        where: { id: id.toString(), userId: userId.toString() },
      });
      const converted = convertToVOType(targetTheme.priority, targetTheme.platform);

      const domainTheme = Theme.reConstruct(
        {
          theme: targetTheme.theme,
          categoryId: CategoryId.reConstruct(targetTheme.categoryId),
          priority: converted.priority,
          platform: converted.platform,
          createdAt: targetTheme.createdAt,
          userId: UserId.reConstruct(targetTheme.userId),
        },
        targetTheme.id
      );

      return domainTheme;
    } catch (error) {
      // データが見つからなかった場合
      if (error.statusCode === 404) throw notFoundException(error.message);
      // DB接続エラーなど、サーバー側が悪いエラーの場合
      throw internalErrorException(error.message);
    }
  }

  async findAll(userId: UserId): Promise<Theme[]> {
    const themes = await prisma.theme.findMany({ where: { userId: userId.toString() } });
    return themes.map((theme) => {
      const converted = convertToVOType(theme.priority, theme.platform);

      return Theme.reConstruct(
        {
          theme: theme.theme,
          categoryId: CategoryId.reConstruct(theme.categoryId),
          priority: converted.priority,
          platform: converted.platform,
          createdAt: theme.createdAt,
          userId: UserId.reConstruct(theme.userId),
        },
        theme.id
      );
    });
  }
}
