import { PrismaClient } from "@prisma/client";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { internalErrorException, notFoundException, unprocessableEntityException } from "../../exception/error";
import { IPriority, Priority, PriorityType } from "../../domain/theme/priority";
import { IPlatform, Platform, PlatformType } from "../../domain/theme/platform";

const prisma = new PrismaClient();
const convertToVOType = (priority: number, platform: number): { priority: PriorityType; platform: PlatformType } => {
  const priorityDataVal: IPriority = { priority: priority as PriorityType };
  const _priority = Priority.create(priorityDataVal).priority;
  const platformDataVal: IPlatform = { platform: platform as PlatformType };
  const _platform = Platform.create(platformDataVal).platform;

  return { priority: _priority, platform: _platform };
};
export class ThemeRepository implements IThemeRepository {
  async create(
    theme: string,
    categoryId: string,
    priority: PriorityType,
    platform: PlatformType,
    userId: string
  ): Promise<Theme> {
    const createdTheme = await prisma.theme
      .create({
        data: {
          theme: theme,
          categoryId: categoryId,
          priority: priority,
          platform: platform,
          userId: userId,
        },
      })
      .catch((error) => {
        throw internalErrorException(error.message);
      });

    const converted = convertToVOType(createdTheme.priority, createdTheme.platform);

    const domainTheme = new Theme(
      createdTheme.id,
      createdTheme.theme,
      createdTheme.categoryId,
      converted.priority,
      converted.platform,
      createdTheme.createdAt,
      createdTheme.userId
    );

    return domainTheme;
  }

  async find(id: string, userId: string): Promise<Theme> {
    try {
      const targetTheme = await prisma.theme.findFirst({
        where: { id: id, userId: userId },
      });
      const converted = convertToVOType(targetTheme.priority, targetTheme.platform);

      const domainTheme = new Theme(
        targetTheme.id,
        targetTheme.theme,
        targetTheme.categoryId,
        converted.priority,
        converted.platform,
        targetTheme.createdAt,
        targetTheme.userId
      );

      return domainTheme;
    } catch (error) {
      // データが見つからなかった場合
      if (error.statusCode === 404) throw notFoundException(error.message);
      // DB接続エラーなど、サーバー側が悪いエラーの場合
      throw internalErrorException(error.message);
    }
  }

  async findAll(userId: string): Promise<Theme[]> {
    const themes = await prisma.theme.findMany({ where: { userId: userId } });
    return themes.map((theme) => {
      const converted = convertToVOType(theme.priority, theme.platform);

      return new Theme(
        theme.id,
        theme.theme,
        theme.categoryId,
        converted.priority,
        converted.platform,
        theme.createdAt,
        theme.userId
      );
    });
  }
}
