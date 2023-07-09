import { PrismaClient } from "@prisma/client";
import { IThemeRepository } from "../../domain/theme/IThemeRepository";
import { Theme } from "../../domain/theme/ThemeEntity";
import { internalErrorException, notAcceptableException, notFoundException } from "../../exception/error";

const prisma = new PrismaClient();

export class ThemeRepository implements IThemeRepository {
  async create(theme: {
    theme: string;
    category: string;
    priority: string;
    platform: string;
    userId: string;
  }): Promise<Theme> {
    const createdTheme = await prisma.theme
      .create({
        data: {
          theme: theme.theme,
          category: theme.category,
          priority: theme.priority,
          platform: theme.platform,
          userId: theme.userId,
        },
      })
      .catch((error) => {
        throw notAcceptableException(error.message);
      });

    const domainTheme = new Theme({
      id: createdTheme.id,
      theme: createdTheme.theme,
      category: createdTheme.category,
      priority: createdTheme.priority,
      platform: createdTheme.platform,
      createdAt: createdTheme.created_at,
      userId: createdTheme.userId,
    });

    return domainTheme;
  }

  async find(theme: { id: string; userId: string }): Promise<Theme> {
    try {
      const targetTheme = await prisma.theme.findFirst({
        where: { id: theme.id, userId: theme.userId },
      });

      const domainTheme = new Theme({
        id: targetTheme.id,
        theme: targetTheme.theme,
        category: targetTheme.category,
        priority: targetTheme.priority,
        platform: targetTheme.platform,
        createdAt: targetTheme.created_at,
        userId: targetTheme.userId,
      });

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
      return new Theme({
        id: theme.id,
        theme: theme.theme,
        category: theme.category,
        priority: theme.priority,
        platform: theme.platform,
        createdAt: theme.created_at,
        userId: theme.userId,
      });
    });
  }
}
