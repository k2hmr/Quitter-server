import { PrismaClient } from "@prisma/client";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { internalErrorException, notFoundException, unprocessableEntityException } from "../../exception/error";
import { PriorityType } from "../../domain/theme/priority";
import { PlatformType } from "../../domain/theme/platform";

const prisma = new PrismaClient();
const priorityName = (priorityIndex: number): PriorityType => {
  switch (priorityIndex) {
    case 1:
      return PriorityType.Low;
    case 2:
      return PriorityType.Middle;
    case 3:
      return PriorityType.High;
    default:
      throw internalErrorException("優先度の値が誤っています。");
  }
};
const platformName = (platformIndex: number): PlatformType => {
  switch (platformIndex) {
    case 1:
      return PlatformType.Note;
    case 2:
      return PlatformType.Youtube;
    case 3:
      return PlatformType.Twitter;
    case 4:
      return PlatformType.Tiktok;
    case 5:
      return PlatformType.Qiita;
    case 6:
      return PlatformType.Zenn;
    case 7:
      return PlatformType.Other;
    default:
      throw internalErrorException("プラットフォームの値が誤っています。");
  }
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

    const domainTheme = new Theme(
      createdTheme.id,
      createdTheme.theme,
      createdTheme.categoryId,
      priorityName(createdTheme.priority),
      platformName(createdTheme.platform),
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

      const domainTheme = new Theme(
        targetTheme.id,
        targetTheme.theme,
        targetTheme.categoryId,
        priorityName(targetTheme.priority),
        platformName(targetTheme.platform),
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
      return new Theme(
        theme.id,
        theme.theme,
        theme.categoryId,
        priorityName(theme.priority),
        platformName(theme.platform),
        theme.createdAt,
        theme.userId
      );
    });
  }
}
